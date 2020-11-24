class Applications::RejectApplicationInvitation < ApplicationService
  attr_reader :application, :reason, :current_account_id

  def initialize(application_id:, reason:, current_account_id: nil)
    @application = ::Application.find_by_uid_or_airtable_id!(application_id)
    @reason = reason
    @current_account_id = current_account_id
  end

  def call
    application.status = 'Invitation Rejected'
    application.invitation_rejection_reason = reason

    success = Logidze.with_responsible(current_account_id) do
      application.save
    end

    if success
      application.sync_to_airtable
      return application
    end

    raise Service::Error.new("applications.failedToReject")
  end
end
