# frozen_string_literal: true

# frozen_string_literal: true

module Mutations
  class SubmitClientApplication < Mutations::BaseMutation
    description "Submits a clients application"
    field :client_application, Types::ClientApplicationType, null: true

    def authorized?
      requires_client!
    end

    def resolve
      check_application_started
      current_user.application_status = "Submitted"
      current_user.save_and_sync!

      {client_application: current_user}
    end

    private

    def check_application_started
      return if current_user.application_status == "Application Started"

      ApiError.invalid_request("APPLICATION_NOT_STARTED", "application status is #{current_user.application_status}")
    end
  end
end
