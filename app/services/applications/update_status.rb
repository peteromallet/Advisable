class Applications::UpdateStatus < ApplicationService
  attr_reader :id, :status, :rejection_reason

  def initialize(id:, status:, rejection_reason: nil)
    @id = id
    @status = status
    @rejection_reason = rejection_reason
  end

  def call
    airtable_record["Application Status"] = status
    airtable_record.save
  end

  private

  def application
    @application ||= Application.find(id)
  end

  def airtable_record
    @airtable_record ||= Airtable::Application.find(application.airtable_id)
  end
end
