class Applications::StartWorking < ApplicationService
  attr_reader :application

  def initialize(application:)
    @application = application
  end

  def call
    application.status = "Working"

    if application.save
      application.sync_to_airtable
      Webhook.process(application)
      return application
    end

    raise Service::Error.new(application.errors.full_messages.first)
  end
end