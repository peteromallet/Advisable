class Proposals::Reject < ApplicationService
  attr_reader :application, :reason, :comment

  def initialize(application:, reason:, comment:)
    @application = application
    @reason = reason
    @comment = comment
  end

  def call
    application.status = "Application Rejected"
    application.rejection_reason = comment

    if application.save
      application.sync_to_airtable
      WebhookEvent.trigger("applications.rejected")
      return application
    else
      raise Service::Error.new(application.errors.full_messages.first)
    end
  end
end