class Applications::RequestReferences < ApplicationService
  attr_reader :application

  def initialize(application:)
    @application = application
  end

  def call
    application.references_requested = true
    if application.save
      application.sync_to_airtable
    end
    application
  end
end