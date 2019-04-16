class Proposals::Accept < ApplicationService
  attr_reader :application

  def initialize(application:)
    @application = application
  end

  def call
    application.status = "Working"
    if application.save
      application.sync_to_airtable
      WebhookEvent.trigger("proposals.accepted")
      return application
    else
      raise Service::Error.new(application.errors.full_messages.first)
    end
  end
end