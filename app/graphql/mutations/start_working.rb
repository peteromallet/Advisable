# frozen_string_literal: true

module Mutations
  class StartWorking < Mutations::BaseMutation
    argument :application, ID, required: true
    argument :monthly_limit, Int, required: false
    argument :project_type, String, required: true

    field :application, Types::ApplicationType, null: true

    def authorized?(**args)
      application = Application.find_by_uid_or_airtable_id!(args[:application])
      policy = ApplicationPolicy.new(current_user, application)
      return true if policy.start_working?

      ApiError.not_authorized("You do not have permission to execute this mutation")
    end

    def resolve(**args)
      application = Application.find_by_uid_or_airtable_id!(args[:application])
      application = Applications::StartWorking.call(application: application, project_type: args[:project_type], monthly_limit: args[:monthly_limit], current_account_id: current_account_id)
      {application: application}
    end
  end
end
