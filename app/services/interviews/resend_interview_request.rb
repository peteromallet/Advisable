class Interviews::ResendInterviewRequest < ApplicationService
  attr_reader :interview, :availability, :time_zone
  
  def initialize(interview:, availability:, time_zone:)
    @interview = interview
    @availability = availability
    @time_zone = time_zone
  end

  def call
    interview.user.update(availability: availability)
    interview.assign_attributes(time_zone: time_zone, status: "More Time Options Added")

    # Don't both validating anything as we want to force these updates
    if interview.save(validate: false)
      interview.sync_to_airtable
      return interview
    end

    raise Service::Error.new(interview.errors.full_messages.first)
  end
end