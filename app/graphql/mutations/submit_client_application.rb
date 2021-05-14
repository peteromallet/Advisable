# frozen_string_literal: true

module Mutations
  class SubmitClientApplication < Mutations::BaseMutation
    attr_reader :user

    argument :accepted_guarantee_terms, Boolean, required: false
    argument :id, ID, required: true
    argument :locality_importance, Int, required: false
    argument :talent_quality, String, required: false

    field :clientApplication, Types::ClientApplicationType, null: true

    def authorized?(**args)
      @user = User.find_by_uid_or_airtable_id!(args[:id])
      ApiError.invalid_request('alreadySubmitted', 'Application has already been submitted') if user.application_status != "Application Started"

      true
    end

    def resolve(**args)
      @user = User.find_by_uid_or_airtable_id!(args[:id])

      user.locality_importance = args[:locality_importance]
      update_talent_quality(args[:talent_quality])
      update_guarantee_terms(args[:accepted_guarantee_terms])
      update_accepted_or_rejected

      current_account_responsible_for do
        user.save!
        user.create_case_study_search
      end
      user.sync_to_airtable
      ClientApplicationSubmittedNotificationJob.perform_later(user.id)

      {clientApplication: user}
    end

    private

    def update_talent_quality(talent_quality)
      return unless talent_quality

      user.talent_quality = talent_quality.downcase
    end

    def update_guarantee_terms(accept)
      return if accept.nil?

      user.accepted_guarantee_terms_at = (Time.zone.now if accept)
    end

    def update_accepted_or_rejected
      application_status = "Application Accepted"
      rejection_reason = nil

      if User::TALENT_QUALITY_OPTIONS.first(2).include?(user.talent_quality)
        application_status = "Application Rejected"
        rejection_reason = 'cheap_talent'
      end

      if user.number_of_freelancers == '0'
        application_status = "Application Rejected"
        rejection_reason = 'not_hiring'
      end

      user.application_status = application_status
      user.rejection_reason = rejection_reason

      user.application_accepted_at = Time.zone.now if application_status == "Application Accepted"
      user.application_rejected_at = Time.zone.now if application_status == "Application Rejected"
    end
  end
end
