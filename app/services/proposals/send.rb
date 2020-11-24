# Service object that handles the action of submitting a proposal. This is
# called from the sendProposal graphql mutation.
class Proposals::Send < ApplicationService
  attr_reader :application, :comment, :current_account_id

  def initialize(application:, comment:, current_account_id: nil)
    @application = application
    @comment = comment
    @current_account_id = current_account_id
  end

  def call
    application.proposal_comment = comment
    application.status = 'Proposed'
    success = Logidze.with_responsible(current_account_id) do
      application.save
    end
    if success
      application.sync_to_airtable
      update_project(application.project)
      WebhookEvent.trigger(
        'applications.proposal_sent',
        WebhookEvent::Application.data(application)
      )
      application
    else
      raise Service::Error.new(application.errors.full_messages.first)
    end
  end

  private

  def update_project(project)
    project.update(status: 'Proposal Received')
    project.sync_to_airtable
  end
end
