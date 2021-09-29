# frozen_string_literal: true

module Mutations
  class SubmitApplication < Mutations::BaseMutation
    description "Used to update an application record during the application process"

    argument :id, ID, required: true

    field :application, Types::ApplicationType, null: true

    def authorized?(id:)
      requires_specialist!

      application = Application.find_by!(uid: id)
      return true if current_user == application.specialist

      ApiError.invalid_request("INVALID_APPLICATION", "The application does not belong to signed in user.")
    end

    def resolve(id:)
      application = Application.find_by!(uid: id)

      ApiError.invalid_request("projects.applicationsClosed") unless application.project.applications_open
      ApiError.invalid_request("applications.cannotSubmit") unless ["Invited To Apply", "Invitation Rejected", "Application Rejected"].include?(application.status)

      application.status = "Applied"
      application.applied_at = Time.zone.now if application.applied_at.blank?
      application.save_and_sync_with_responsible!(current_account_id)

      {application: application}
    end
  end
end
