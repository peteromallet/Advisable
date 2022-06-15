# frozen_string_literal: true

module Mutations
  class ScheduleInterview < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :starts_at, String, required: true

    field :interview, Types::Interview, null: true

    def authorized?(id:, **args)
      requires_specialist!
      interview = Interview.find_by!(uid: id)
      policy = InterviewPolicy.new(current_user, interview)
      ApiError.not_authorized("You do not have permission to schedule this interview") unless policy.schedule?
      ApiError.invalid_request("INTERVIEW_IS_NOT_SCHEDULABLE", "Interview is not in a schedulable state.") unless Interview::SCHEDULABLE_STATUSES.include?(interview.status)
      ApiError.invalid_request("STARTS_AT_NOT_AVAILABLE_ON_CLIENT", "Argument `starts_at` is not inside of the client's availability.") unless interview.user.availability.include?(args[:starts_at])
      true
    end

    def resolve(**args)
      interview = Interview.find_by!(uid: args[:id])
      specialist = interview.specialist
      current_account_responsible_for do
        interview.update!(
          starts_at: args[:starts_at],
          call_scheduled_at: Time.current,
          status: "Call Scheduled"
        )
      end

      conversation = Conversation.by_accounts(interview.accounts)
      conversation.new_message!(kind: "InterviewScheduled", interview:, metadata: {starts_at: interview.starts_at}, send_emails: false)
      interview.create_video_call! if interview.video_call.blank?
      GoogleCalendar.new.schedule_for_interview(interview)

      unless specialist.account.completed_tutorial?("introductory_call")
        SpecialistMailer.first_interview_scheduled(interview).deliver_later
        specialist.account.complete_tutorial("introductory_call")
      end

      {interview:}
    end
  end
end
