# frozen_string_literal: true

module Mutations
  class ResendInterviewRequest < Mutations::BaseMutation
    argument :id, ID, required: true

    field :interview, Types::Interview, null: true

    def authorized?(id:)
      requires_current_user!
      interview = Interview.find_by!(uid: id)
      policy = InterviewPolicy.new(current_user, interview)
      return true if policy.resend_request?

      ApiError.not_authorized("You do not have permission to resend request to this interview")
    end

    def resolve(id:)
      interview = Interview.find_by!(uid: id)
      interview.assign_attributes(status: "More Time Options Added", more_time_options_added_at: Time.zone.now)
      success = current_account_responsible_for { interview.save(validate: false) }
      # Don't bother validating as we want to force these updates
      if success
        {interview: interview}
      else
        ApiError.invalid_request("FAILED_TO_RESEND", interview.errors.full_messages.first)
      end
    end
  end
end
