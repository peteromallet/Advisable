class Interviews::ResendInterviewRequest < ApplicationService
  attr_reader :interview, :availability, :time_zone
  
  def initialize(interview:, availability:, time_zone: )
    @interview = interview
    @availability = availability
    @time_zone = time_zone
  end

  def call
    interview.user.update_attributes(availability: availability)
    if interview.update_attributes(time_zone: time_zone, status: "Call Requested")
      update_airtable
    end

    interview
  end

  private

  def airtable_record
    @airtable ||= Airtable::Interview.find(interview.airtable_id)
  end

  def update_airtable
    airtable_record["Call Status"] = "Call Requested"
    airtable_record.save
  end
end