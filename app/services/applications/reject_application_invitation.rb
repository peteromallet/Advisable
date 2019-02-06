class Applications::RejectApplicationInvitation < ApplicationService
  attr_reader :application, :reason

  def initialize(application_id:, reason:)
    @application = ::Application.find_by_airtable_id!(application_id)
    @reason = reason
  end

  def call
    application.status = 'Invitation Rejected'
    application.invitation_rejection_reason = reason
    airtable_record.push(application) if application.save
    application
  end

  private

  def airtable_record
    @airtable_record ||= Airtable::Application.find(application.airtable_id)
  end

end