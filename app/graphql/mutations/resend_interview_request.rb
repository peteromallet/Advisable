# frozen_string_literal: true

module Mutations
  class ResendInterviewRequest < Mutations::BaseMutation
    argument :id, ID, required: true

    field :interview, Types::Interview, null: true

    def resolve(id:)
      interview = Interview.find_by_uid_or_airtable_id!(id)
      interview.assign_attributes(status: "More Time Options Added", more_time_options_added_at: Time.zone.now)
      success = current_account_responsible_for { interview.save(validate: false) }
      # Don't bother validating as we want to force these updates
      if success
        interview.sync_to_airtable
        {interview: interview}
      else
        ApiError.invalid_request("FAILED_TO_RESEND", interview.errors.full_messages.first)
      end
    end
  end
end
