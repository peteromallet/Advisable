# frozen_string_literal: true

module Mutations
  class RescheduleInterview < Mutations::BaseMutation
    argument :interview, ID, required: true
    argument :message, String, required: false
    argument :starts_at, GraphQL::Types::ISO8601DateTime, required: true

    field :interview, Types::Interview, null: true

    def authorized?(interview:, **_args)
      requires_current_user!
      interview = Interview.find_by!(uid: interview)
      policy = InterviewPolicy.new(current_user, interview)
      return true if policy.reschedule?

      ApiError.not_authorized("You do not have permission to reschedule this interview.")
    end

    def resolve(starts_at:, **args)
      interview = Interview.find_by!(uid: args[:interview])
      ApiError.invalid_request("STARTS AT NOT IN FUTURE") unless starts_at.future?
      ApiError.invalid_request("INTERVIEW NOT RESCHEDULABLE") unless Interview::RESCHEDULABLE_STATUSES.include?(interview.status)

      current_account_responsible_for do
        interview.update(starts_at:)
        GoogleCalendar.new.schedule_for_interview(interview)
        conversation = Conversation.by_accounts(interview.accounts)
        conversation.new_message!(kind: "InterviewRescheduled", interview:, send_emails: false, metadata: {starts_at: starts_at.iso8601})
        message = conversation.new_message!(author: current_account, content: args[:message], send_emails: false) if args[:message].present?
        other_participants = interview.accounts - [current_account]
        other_participants.each { |acc| AccountMailer.interview_rescheduled(acc, interview, current_account, message).deliver_later }
      end

      {interview:}
    end
  end
end
