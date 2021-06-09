# frozen_string_literal: true

class ZappierInteractorController < ApplicationController
  include MagicLinkHelper

  ALLOWED_APPLICATION_FIELDS = %i[comment featured hidden hide_from_profile introduction rejection_reason rejection_reason_comment rejection_feedback score started_working_at status stopped_working_at stopped_working_reason source].freeze
  PARAMETRIZED_APPLICATION_META_FIELDS = Application::META_FIELDS.index_by { |f| f.delete("-").parameterize(separator: "_") }.freeze
  ALLOWED_USER_FIELDS = %i[campaign_name campaign_medium campaign_source trustpilot_review_status].freeze
  ALLOWED_SPECIALIST_FIELDS = %i[campaign_name campaign_source application_stage application_status campaign_medium case_study_status trustpilot_review_status].freeze
  ALLOWED_PROJECT_FIELDS = %i[status sales_status estimated_budget remote required_characteristics goals description deposit company_description stop_candidate_proposed_emails level_of_expertise_required likelihood_to_confirm lost_reason project_start].freeze

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
      attrs = parse_params(params.permit(ALLOWED_USER_FIELDS))
      attrs[:owner] = SalesPerson.find_by(uid: params[:owner]) if params[:owner].present?
      user.update!(attrs)
      update_unsubscriptions(user.account)
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
      update_unsubscriptions(specialist.account)
    end
  end

  def update_project
    find_and_update(Project) do |project|
      attrs = parse_params(params.permit(ALLOWED_PROJECT_FIELDS))
      questions = parse_params(params.permit(:question_1, :question_2)).values # rubocop:disable Naming/VariableNumber
      attrs[:questions] = questions.compact unless questions.empty?

      if params[:required_characteristics].presence || params[:optional_characteristics].presence
        required = params[:required_characteristics].presence || project.required_characteristics
        optional = params[:optional_characteristic].presence || project.optional_characteristics
        attrs[:characteristics] = (required || []) + (optional || [])
        attrs[:required_characteristics] = required
      end

      if params[:skills].present?
        project.skills = params[:skills].filter_map do |name|
          Skill.find_by(name: name)
        end
      end

      if params[:primary_skill].present?
        project.project_skills.where(primary: true).update_all(primary: false) # rubocop:disable Rails/SkipsModelValidations
        skill = Skill.find_by(name: params[:primary_skill])
        project.skills << skill unless project.project_skills.find_by(skill: skill)
        project.project_skills.find_by(skill: skill).update(primary: true)
      end

      project.update!(attrs)
    end
  end

  def update_application
    find_and_update(Application) do |application|
      application.update!(application_params(application.meta_fields))
    end
  end

  def create_application
    specialist = Specialist.find_by!(uid: params[:specialist_id])
    project = Project.find_by!(uid: params[:project_id])
    application = Application.create!(application_params.merge({specialist_id: specialist.id, project_id: project.id}))
    application.sync_to_airtable
    render json: {status: "OK.", uid: application.uid}
  rescue ActiveRecord::RecordNotFound => e
    render json: {error: "Record not found", message: e.message}, status: :unprocessable_entity
  rescue ActiveRecord::RecordInvalid => e
    render json: {error: "Validation failed", message: e.message}, status: :unprocessable_entity
  end

  def attach_previous_project_image
    previous_project = PreviousProject.find_by!(uid: params[:uid])
    raise ActiveRecord::RecordNotFound if params[:image_url].blank?

    AttachImageJob.perform_later(previous_project, params[:image_url])
    render json: {status: "OK."}
  rescue ActiveRecord::RecordNotFound
    render json: {error: "No image attached."}, status: :unprocessable_entity
  end

  def create_magic_link
    account = find_account_from_uid(params[:uid])
    options = {}
    options[:expires_at] = params[:expires_at] if params[:expires_at].present?
    link = magic_link(account, params[:url], **options)
    render json: {magic_link: link}
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Account not found"}, status: :unprocessable_entity
  end

  def enable_guild
    specialist = Specialist.find_by!(uid: params[:uid])
    specialist.update!(guild: true)
    render json: {status: "OK."}
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Account not found"}, status: :unprocessable_entity
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
    article = case_study.import!
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

  private

  def find_and_update(model, attrs = {})
    record = model.public_send(:find_by!, uid: params[:uid])
    return unless record

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

  def application_params(existng_meta_fields = {})
    attrs = params.require(:application).permit(ALLOWED_APPLICATION_FIELDS + PARAMETRIZED_APPLICATION_META_FIELDS.keys).to_h
    attrs[:meta_fields] = existng_meta_fields
    PARAMETRIZED_APPLICATION_META_FIELDS.each do |param, field|
      attrs[:meta_fields][field] = attrs.delete(param) if attrs.key?(param)
    end
    attrs
  end

  def update_unsubscriptions(account)
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

  def find_account_from_uid(uid)
    klass = case uid
            when /^spe/
              Specialist
            when /^use/
              User
            when /^acc/
              return Account.find_by!(uid: uid)
            else
              raise ActiveRecord::RecordNotFound
            end
    klass.public_send(:find_by!, uid: uid).account
  end

  def verify_key!
    return if params[:key].present? && params[:key] == ENV["ACCOUNTS_CREATE_KEY"]

    render json: {error: "You are not authorized to perform this action."}, status: :unauthorized
  end
end
