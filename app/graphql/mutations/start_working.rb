# frozen_string_literal: true

module Applications
  class StartWorking < ApplicationService
    attr_reader :application, :project_type, :monthly_limit, :current_account_id

    def initialize(application:, project_type:, monthly_limit:, current_account_id: nil)
      super()
      @application = application
      @project_type = project_type
      @monthly_limit = monthly_limit
      @current_account_id = current_account_id
    end

    def call
      raise Service::Error, "INVALID_PROJECT_TYPE" unless %w[Fixed Flexible].include?(project_type)

      application.status = "Working"
      application.project_type = project_type
      application.monthly_limit = monthly_limit if project_type == "Flexible"

      success = Logidze.with_responsible(current_account_id) do
        application.save
      end

      if success
        application.create_previous_project if application.previous_project.blank?
        application.sync_to_airtable
        return application
      end

      raise Service::Error, application.errors.full_messages.first
    end
  end
end

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
    rescue Service::Error => e
      ApiError.service_error(e)
    end
  end
end
