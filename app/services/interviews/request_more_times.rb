class Interviews::RequestMoreTimes < ApplicationService
  attr_reader :interview
  
  def initialize(interview:)
    @interview = interview
  end

  def call
    if interview.status != 'Call Requested'
      raise Service::Error.new("interview.not_requested")
    end

    if interview.update_attributes(status: "Need More Time Options")
      update_airtable
    end

    interview
  end

  private

  def airtable_record
    @airtable ||= Airtable::Interview.find(interview.airtable_id)
  end

  def update_airtable
    airtable_record["Call Status"] = "Need More Time Options"
    airtable_record.save
  end
end