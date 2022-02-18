# frozen_string_literal: true

module Mutations
  class DeclineInterview < Mutations::BaseMutation
    argument :interview, ID, required: true
    argument :reason, String, required: false

    field :interview, Types::Interview, null: true

    def authorized?(interview:, **_args)
      requires_specialist!
      interview = Interview.find_by!(uid: interview)
      InterviewPolicy.new(current_user, interview).decline?
    end

    def resolve(interview:, reason: nil)
      interview = Interview.find_by!(uid: interview)
      create_system_message(interview)
      create_user_message(interview, reason)
      interview.update(status: "Specialist Declined")
      {interview:}
    end

    private

    def create_system_message(interview)
      return if interview.messages.none?

      interview.messages.first.conversation.new_message!(kind: "InterviewDeclined", interview:, send_emails: false)
    end

    def create_user_message(interview, reason)
      return if reason.nil? || interview.messages.none?

      message = interview.messages.first.conversation.new_message!(author: current_user.account, content: reason, send_emails: false)
      UserMailer.interview_declined(interview, message).deliver_later
    end
  end
end
