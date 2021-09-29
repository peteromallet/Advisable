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
      ApiError.invalid_request("INVALID_PROJECT_TYPE") unless %w[Fixed Flexible].include?(args[:project_type])

      application = Application.find_by_uid_or_airtable_id!(args[:application])
      application.status = "Working"
      application.project_type = args[:project_type]
      application.monthly_limit = args[:monthly_limit] if args[:project_type] == "Flexible"
      application.save_and_sync_with_responsible!(current_account_id)
      application.create_previous_project if application.previous_project.blank?

      {application: application}
    end
  end
end
