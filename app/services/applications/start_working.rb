class Applications::StartWorking < ApplicationService
  attr_reader :application, :project_type, :monthly_limit

  def initialize(application:, project_type:, monthly_limit:)
    @application = application
    @project_type = project_type
    @monthly_limit = monthly_limit
  end

  def call
    unless %w[Fixed Flexible].include?(project_type)
      raise Service::Error.new('invalidProjectType')
    end

    application.status = 'Working'
    application.project_type = project_type

    if project_type === 'Flexible'
      application.monthly_limit = monthly_limit
      application.billing_cycle = 'Weekly'
    end

    if application.save
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
