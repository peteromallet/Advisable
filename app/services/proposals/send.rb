# Service object that handles the action of submitting a proposal. This is
# called from the sendProposal graphql mutation.
class Proposals::Send < ApplicationService
  attr_reader :application, :comment

  def initialize(application:, comment:)
    @application = application
    @comment = comment
  end

  def call
    application.proposal_comment = comment
    application.status = "Proposed"
    if application.save
      application.sync_to_airtable
      WebhookEvent.trigger("proposals.sent")
      return application
    else
      raise Service::Error.new(application.errors.full_messages.first)
    end
  end
end