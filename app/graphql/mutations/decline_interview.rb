# frozen_string_literal: true

module Mutations
  class DeclineInterview < Mutations::BaseMutation
    argument :interview, ID, required: true
    argument :reason, String, required: false

    field :interview, Types::Interview, null: true

    def authorized?(interview:, **_args)
      requires_current_user!
      interview = Interview.find_by!(uid: interview)
      policy = InterviewPolicy.new(current_user, interview)
      ApiError.not_authorized("You do not have permission to decline this interview") unless policy.decline?
      ApiError.invalid_request("CANNOT_DECLINE", "Interview is not in a declinable state") unless Interview::DECLINABLE_STATUSES.include?(interview.status)
      true
    end

    def resolve(interview:, reason: nil)
      interview = Interview.find_by!(uid: interview)
      interview.decline!(current_user.account, reason, notify: true)
      {interview:}
    end
  end
end
