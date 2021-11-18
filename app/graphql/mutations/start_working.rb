# frozen_string_literal: true

module Mutations
  class StartWorking < Mutations::BaseMutation
    argument :application, ID, required: true
    argument :monthly_limit, Int, required: false
    argument :project_type, String, required: true

    field :application, Types::ApplicationType, null: true

    def authorized?(**args)
      application = Application.find_by!(uid: args[:application])
      policy = ApplicationPolicy.new(current_user, application)
      return true if policy.start_working?

      ApiError.not_authorized("You do not have permission to execute this mutation")
    end

    def resolve(**args)
      ApiError.invalid_request("INVALID_PROJECT_TYPE") unless %w[Fixed Flexible].include?(args[:project_type])

      application = Application.find_by!(uid: args[:application])
      application.status = "Working"
      application.project_type = args[:project_type]
      application.monthly_limit = args[:monthly_limit] if args[:project_type] == "Flexible"
      save_with_current_account!(application)

      {application: application}
    end
  end
end
