# frozen_string_literal: true

# frozen_string_literal: true

module Mutations
  class SubmitClientApplication < Mutations::BaseMutation
    description "Submits a clients application"
    field :client_application, Types::ClientApplicationType, null: true

    def authorized?
      requires_client!
      check_application_started
      true
    end

    def resolve
      current_account_responsible_for do
        current_user.application_status = "Submitted"
        current_user.save!
        current_user.create_case_study_search
      end

      current_user.sync_to_airtable
      ClientApplicationSubmittedNotificationJob.perform_later(current_user.id)

      {client_application: current_user}
    end

    private

    def check_application_started
      return if current_user.application_status == "Application Started"

      ApiError.invalid_request("APPLICATION_NOT_STARTED", "application status is #{current_user.application_status}")
    end
  end
end
