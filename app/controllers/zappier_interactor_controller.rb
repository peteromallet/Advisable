# frozen_string_literal: true

class ZappierInteractorController < ApplicationController
  include MagicLinkHelper

  ALLOWED_APPLICATION_FIELDS = %i[comment featured hidden hide_from_profile introduction references_requested rejection_reason rejection_reason_comment rejection_feedback score started_working_at status stopped_working_at stopped_working_reason source].freeze
  PARAMETRIZED_APPLICATION_META_FIELDS = Application::META_FIELDS.index_by { |f| f.delete("-").parameterize(separator: "_") }.freeze

  skip_before_action :verify_authenticity_token
  before_action :verify_key!

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

  def update_application
    application = Application.find_by!(uid: params[:uid])
    application.update!(application_params(application.meta_fields))
    application.sync_to_airtable
    render json: {status: "OK.", uid: application.uid}
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Application not found"}, status: :unprocessable_entity
  rescue ActiveRecord::RecordInvalid => e
    render json: {error: "Validation failed", message: e.message}, status: :unprocessable_entity
  end

  def update_interview
    interview = Interview.find_by!(uid: params[:uid])
    interview.update!(status: params[:status])
    render json: {status: "OK.", uid: interview.uid}
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Interview not found"}, status: :unprocessable_entity
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
    url = params[:url]
    options = {}
    options[:expires_at] = params[:expires_at] if params[:expires_at].present?
    link = magic_link(account, url, **options)
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

  def application_params(existng_meta_fields = {})
    attrs = params.require(:application).permit(ALLOWED_APPLICATION_FIELDS + PARAMETRIZED_APPLICATION_META_FIELDS.keys).to_h
    attrs[:meta_fields] = existng_meta_fields
    PARAMETRIZED_APPLICATION_META_FIELDS.each do |param, field|
      attrs[:meta_fields][field] = attrs.delete(param) if attrs.key?(param)
    end
    attrs
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
