class Proposals::Reject < ApplicationService
  attr_reader :application, :reason, :comment

  def initialize(application:, reason:, comment:)
    @application = application
    @reason = reason
    @comment = comment
  end

  def call
    if application.status != "Proposed"
      raise Service::Error.new("applications.notProposed")
    end

    application.status = "Application Rejected"
    application.rejection_reason = reason
    application.rejection_reason_comment = comment

    if application.save
      application.sync_to_airtable
      WebhookEvent.trigger(
        "applications.proposal_rejected",
        WebhookEvent::Application.data(application)
      )
      return application
    else
      raise Service::Error.new(application.errors.full_messages.first)
    end
  end
end