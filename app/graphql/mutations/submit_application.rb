# frozen_string_literal: true

# Handles the submission of an application
module Applications
  class Submit < ApplicationService
    attr_reader :application, :current_account_id

    def initialize(application, current_account_id: nil)
      super()
      @application = application
      @current_account_id = current_account_id
    end

    def call
      applications_open?
      is_submittable?
      application.status = "Applied"
      application.applied_at = Time.zone.now if application.applied_at.blank?

      success = Logidze.with_responsible(current_account_id) do
        application.save
      end

      application.sync_to_airtable if success
      application
    end

    private

    def applications_open?
      return if application.project.applications_open

      raise Service::Error, "projects.applicationsClosed"
    end

    def is_submittable?
      return if application.status == "Invited To Apply"
      # Allow people to change their mind and apply after rejceting an application
      return if application.status == "Invitation Rejected"
      # Allow specialists to re-apply after their applcaiton has been rejected
      return if application.status == "Application Rejected"

      raise Service::Error, "applications.cannotSubmit"
    end
  end
end

# Used to update an application record during the application process.
module Mutations
  class SubmitApplication < Mutations::BaseMutation
    argument :id, ID, required: true

    field :application, Types::ApplicationType, null: true

    def authorized?(id:, **_args)
      requires_specialist!

      application = Application.find_by!(uid: id)
      return true if current_user == application.specialist

      raise ApiError::InvalidRequest.new("INVALID_APPLICATION", "The application does not belong to signed in user.")
    end

    def resolve(id:)
      application = Application.find_by_uid_or_airtable_id!(id)
      application = Applications::Submit.call(application, current_account_id: current_account_id)
      {application: application}
    rescue Service::Error => e
      ApiError.service_error(e)
    end
  end
end
