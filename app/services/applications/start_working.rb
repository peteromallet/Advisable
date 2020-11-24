class Applications::StartWorking < ApplicationService
  attr_reader :application, :project_type, :monthly_limit, :current_account_id

  def initialize(application:, project_type:, monthly_limit:, current_account_id: nil)
    @application = application
    @project_type = project_type
    @monthly_limit = monthly_limit
    @current_account_id = current_account_id
  end

  def call
    unless %w[Fixed Flexible].include?(project_type)
      raise Service::Error.new('invalidProjectType')
    end

    application.status = 'Working'
    application.project_type = project_type
    application.monthly_limit = monthly_limit if project_type == 'Flexible'

    success = Logidze.with_responsible(current_account_id) do
      application.save
    end

    if success
      if application.previous_project.blank?
        project = application.create_previous_project
      end

      if project_type == 'Flexible'
        Applications::FlexibleInvoice.call(application: application)
      end

      application.sync_to_airtable
      Webhook.process(application)
      return application
    end

    raise Service::Error.new(application.errors.full_messages.first)
  end
end
