class Applications::RejectApplicationInvitation < ApplicationService
  attr_reader :application, :reason

  def initialize(application_id:, reason:)
    @application = ::Application.find_by_uid_or_airtable_id(application_id)
    @reason = reason
  end

  def call
    application.status = 'Invitation Rejected'
    application.invitation_rejection_reason = reason

    if application.save
      application.sync_to_airtable
      return application
    end

    raise Service::Error.new("applications.failedToReject")
  end
end
