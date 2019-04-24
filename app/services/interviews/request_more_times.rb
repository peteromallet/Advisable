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
      interview.sync_to_airtable
    end

    interview
  end
end