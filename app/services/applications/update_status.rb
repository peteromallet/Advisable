class Applications::UpdateStatus < Service
  attr_reader :id, :status, :rejection_reason_id

  def initialize(id:, status:, rejection_reason_id: nil)
    @id = id
    @status = status
    @rejection_reason_id = rejection_reason_id
  end

  def call
    # update the airtable copy
    airtable_record["Application Status"] = status
    airtable_record["Rejected Reason"] = [rejection_reason.airtable_id] if rejection_reason_id
    airtable_record.save
    # update our local copy
    application.status = status
    application.rejection_reason = rejection_reason if rejection_reason_id
    application.save
    Webhook.process(application)
    application
  end

  private

  def application
    @application ||= Application.find(id)
  end

  def rejection_reason
    @rejection_reason ||= RejectionReason.find(rejection_reason_id)
  end

  def airtable_record
    @airtable_record ||= Airtable::Application.find(application.airtable_id)
  end
end
