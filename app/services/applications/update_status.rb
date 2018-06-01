class Applications::UpdateStatus < Service
  attr_reader :id, :status, :rejection_reason

  def initialize(id:, status:, rejection_reason: nil)
    @id = id
    @status = status
    @rejection_reason = rejection_reason
  end

  def call
    # update the airtable copy
    airtable_record["Application Status"] = status
    airtable_record["Rejection Reason"] = rejection_reason
    airtable_record.save
    # update our local copy
    application.status = status
    application.save
    application
  end

  private

  def application
    @application ||= Application.find(id)
  end

  def airtable_record
    @airtable_record ||= Airtable::Application.find(application.airtable_id)
  end
end
