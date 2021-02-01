# frozen_string_literal: true

class Proposals
  class Reject < ApplicationService
    attr_reader :application, :reason, :feedback, :current_account_id

    def initialize(application:, reason:, feedback:, current_account_id: nil)
      super
      @application = application
      @reason = reason
      @feedback = feedback
      @current_account_id = current_account_id
    end

    def call
      raise Service::Error, "applications.notProposed" if application.status != "Proposed"

      application.status = "Application Rejected"
      application.rejection_reason = reason
      application.rejection_feedback = feedback

      success = Logidze.with_responsible(current_account_id) do
        application.save
      end

      raise Service::Error, application.errors.full_messages.first unless success

      application.sync_to_airtable
      WebhookEvent.trigger(
        "applications.proposal_rejected",
        WebhookEvent::Application.data(application)
      )
      application
    end
  end
end
