class Proposals::Reject < ApplicationService
  attr_reader :application, :reason, :comment, :current_account_id

  def initialize(application:, reason:, comment:, current_account_id: nil)
    @application = application
    @reason = reason
    @comment = comment
    @current_account_id = current_account_id
  end

  def call
    if application.status != "Proposed"
      raise Service::Error.new("applications.notProposed")
    end

    application.status = "Application Rejected"
    application.rejection_reason = reason
    application.rejection_reason_comment = comment

    success = Logidze.with_responsible(current_account_id) do
      application.save
    end

    if success
      application.sync_to_airtable
      WebhookEvent.trigger(
        "applications.proposal_rejected",
        WebhookEvent::Application.data(application)
      )
      application
    else
      raise Service::Error.new(application.errors.full_messages.first)
    end
  end
end
