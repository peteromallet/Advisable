# frozen_string_literal: true

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
