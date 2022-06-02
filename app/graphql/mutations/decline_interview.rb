# frozen_string_literal: true

module Mutations
  class DeclineInterview < Mutations::BaseMutation
    argument :interview, ID, required: true
    argument :reason, String, required: false

    field :interview, Types::Interview, null: true

    def authorized?(interview:, **_args)
      requires_specialist!
      interview = Interview.find_by!(uid: interview)
      policy = InterviewPolicy.new(current_user, interview)
      ApiError.not_authorized("You do not have permission to decline this interview") unless policy.decline?
      ApiError.invalid_request("CANNOT_DECLINE", "Interview is not in a declinable state") unless Interview::DECLINABLE_STATUSES.include?(interview.status)
      true
    end

    def resolve(interview:, reason: nil)
      interview = Interview.find_by!(uid: interview)
      conversation = Conversation.by_accounts(interview.accounts)
      conversation.new_message!(kind: "InterviewDeclined", interview:, send_emails: false)
      if reason.present?
        message = conversation.new_message!(author: current_account, content: reason, send_emails: false)
        UserMailer.interview_declined(interview, message).deliver_later
      end
      interview.update(status: "Specialist Declined", reason:)
      SlackMessageJob.perform_later(channel: "consultation_requests", text: "#{current_user.account.name} declined a consultation request from #{interview.user.name_with_company}. They provided the following reason: \"#{reason}\".")
      {interview:}
    end
  end
end
