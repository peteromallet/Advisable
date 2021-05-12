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
      raise Service::Error, 'invalidProjectType' unless %w[Fixed Flexible].include?(project_type)

      application.status = 'Working'
      application.project_type = project_type
      application.monthly_limit = monthly_limit if project_type == 'Flexible'

      success = Logidze.with_responsible(current_account_id) do
        application.save
      end

      if success
        application.create_previous_project if application.previous_project.blank?
        Applications::FlexibleInvoice.call(application: application) if project_type == 'Flexible'
        application.sync_to_airtable
        return application
      end

      raise Service::Error, application.errors.full_messages.first
    end
  end
end
