class Interviews::ResendInterviewRequest < ApplicationService
  attr_reader :interview, :availability, :time_zone
  
  def initialize(interview:, availability:, time_zone:)
    @interview = interview
    @availability = availability
    @time_zone = time_zone
  end

  def call
    interview.user.update_attributes(availability: availability)
    interview.assign_attributes(time_zone: time_zone, status: "More Time Options Added")

    if interview.save
      update_airtable
      return interview
    end

    raise Service::Error.new(interview.errors.full_messages.first)
  end

  private

  def airtable_record
    @airtable ||= Airtable::Interview.find(interview.airtable_id)
  end

  def update_airtable
    airtable_record["Call Status"] = interview.status
    airtable_record.save
  end
end