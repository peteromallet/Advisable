class Applications::StartWorking < ApplicationService
  attr_reader :application, :project_type

  def initialize(application:, project_type:)
    @application = application
    @project_type = project_type
  end

  def call
    unless ['Fixed', 'Flexible'].include?(project_type)
      raise Service::Error.new("invalidProjectType")
    end

    application.status = "Working"
    application.project_type = project_type

    if application.save
      application.sync_to_airtable
      Webhook.process(application)
      return application
    end

    raise Service::Error.new(application.errors.full_messages.first)
  end
end