# frozen_string_literal: true

class ZapierInteractorController < ApplicationController
  include MagicLinkHelper

  ALLOWED_USER_FIELDS = %i[campaign_name campaign_medium campaign_source application_status trustpilot_review_status].freeze
  ALLOWED_SPECIALIST_FIELDS = %i[campaign_name campaign_source application_stage application_status campaign_medium case_study_status trustpilot_review_status].freeze
  TASK_STAGE_MAPPING = {"Quote Requested" => :quote_requested_at, "Quote Provided" => :quote_provided_at, "Assigned" => :assigned_at, "Submitted" => :submitted_at, "Approved" => :approved_at, "Working" => :started_working_at}.freeze

  skip_before_action :verify_authenticity_token
  before_action :verify_key!

  def update_interview
    find_and_update(Interview, params.permit(:status))
  end

  def update_consultation
    find_and_update(Consultation, params.permit(:status))
  end

  def update_user
    find_and_update(User) do |user|
      user.update!(parse_params(params.permit(ALLOWED_USER_FIELDS)))
      if params[:owner].present?
        sales_person = params[:owner] == "-" ? nil : SalesPerson.find_by!(uid: params[:owner])
        user.company.update!(sales_person_id: sales_person&.id)
      end
      update_unsubscriptions!(user.account)
    end
  end

  def update_specialist
    find_and_update(Specialist) do |specialist|
      attrs = parse_params(params.permit(ALLOWED_SPECIALIST_FIELDS))
      if params[:interviewer].present?
        sales_person = params[:interviewer] == "-" ? nil : SalesPerson.find_by!(uid: params[:interviewer])
        attrs[:interviewer_id] = sales_person&.id
      end
      specialist.update!(attrs)
      update_unsubscriptions!(specialist.account)
    end
  end

  def create_magic_link
    with_account do |account|
      options = {}
      options[:expires_at] = params[:expires_at] if params[:expires_at].present?
      link = magic_link(account, params[:url], **options)
      render json: {magic_link: link}
    end
  end

  def enable_guild
    specialist = Specialist.find_by!(uid: params[:uid])
    specialist.update!(guild: true)
    render json: {status: "OK."}
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Specialist not found"}, status: :unprocessable_entity
  end

  def boost_guild_post
    post = Guild::Post.find(params[:post_id])
    post.boost!
    render json: {status: "OK."}
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Post not found"}, status: :unprocessable_entity
  rescue Guild::Post::BoostError => e
    render json: {error: e.message}, status: :unprocessable_entity
  end

  def import_case_study
    case_study = Airtable::CaseStudy.find(params[:airtable_id])
    article = case_study.article_record
    CaseStudyImportJob.perform_later(article.airtable_id)
    render json: {uid: article.uid, airtable_id: article.airtable_id}
  rescue Airrecord::Error => e
    if e.message.starts_with?("HTTP 404")
      render json: {error: "Case Study not found"}, status: :unprocessable_entity
    else
      Sentry.capture_exception(e, extra: {airtable_id: params[:airtable_id]})
      render json: {error: "Airtable communication error"}, status: :unprocessable_entity
    end
  rescue ActiveRecord::ActiveRecordError => e
    Sentry.capture_message("Something went wrong when importing Case Study #{params[:airtable_id]}", extra: {message: e.message})
    render json: {error: "Something went wrong"}, status: :unprocessable_entity
  end

  def send_email
    with_account do |account|
      AccountMailer.zapier_email(account, params[:subject], params[:body]).deliver_later
      render json: {status: "OK."}
    end
  end

  def create_message
    accounts = params[:uids].map do |uid|
      find_account_by_uid(uid)
    end
    conversation = Conversation.by_accounts(accounts)
    author = params[:author].present? ? find_account_by_uid(params[:author]) : nil
    conversation.new_message!(author:, content: params[:content])
    render json: {status: "OK.", conversation: conversation.uid}
  end

  private

  def find_and_update(model, attrs = {})
    record = model.public_send(:find_by!, uid: params[:uid])

    if attrs.present?
      record.update!(attrs)
    else
      yield(record)
    end

    record.sync_to_airtable if record.respond_to?(:sync_to_airtable) && record.airtable_id.present?

    render json: {status: "OK.", uid: record.uid}
  rescue ActiveRecord::RecordNotFound
    render json: {error: "#{model} not found"}, status: :unprocessable_entity
  rescue ActiveRecord::RecordInvalid => e
    render json: {error: "Validation failed", message: e.message}, status: :unprocessable_entity
  end

  def update_unsubscriptions!(account)
    unsubscribes = account.unsubscribed_from.uniq
    Account::SUBSCRIPTIONS.each do |name|
      param = params["unsubscribe_#{name.downcase.tr(" ", "_")}"]
      case param
      when false
        unsubscribes -= [name]
      when true
        unsubscribes += [name]
      end
    end
    account.update!(unsubscribed_from: unsubscribes.uniq)
  end

  # Remove empty keys to avoid nullifying
  # Make explicit nullifying possible via `-`
  def parse_params(attrs)
    attrs.to_h.filter_map do |k, v|
      next if v.blank? && v != "-"

      [k, v == "-" ? nil : v]
    end.to_h
  end

  def with_account
    yield(find_account_by_uid(params[:uid]))
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Account not found"}, status: :unprocessable_entity
  end

  def find_account_by_uid(uid)
    klass = case uid
            when /^spe/
              Specialist
            when /^use/
              User
            when /^acc/
              return Account.find_by!(uid:)
            else
              raise ActiveRecord::RecordNotFound
            end
    klass.public_send(:find_by!, uid:).account
  end

  def verify_key!
    return if params[:key].present? && params[:key] == ENV["ACCOUNTS_CREATE_KEY"]

    render json: {error: "You are not authorized to perform this action."}, status: :unauthorized
  end
end
