class Interviews::ResendInterviewRequest < ApplicationService
  attr_reader :interview

  def initialize(interview:)
    @interview = interview
  end

  def call
    interview.assign_attributes(
      status: 'More Time Options Added'
    )

    # Don't both validating anything as we want to force these updates
    if interview.save(validate: false)
      interview.sync_to_airtable
      return interview
    end

    raise Service::Error.new(interview.errors.full_messages.first)
  end
end
