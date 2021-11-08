# frozen_string_literal: true

module Mutations
  class ScheduleInterview < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :phone_number, String, required: false
    argument :starts_at, String, required: true

    field :interview, Types::Interview, null: true

    ALLOWED_STATUES = [
      "Call Requested",
      "Client Requested Reschedule",
      "Specialist Requested Reschedule",
      "More Time Options Added"
    ].freeze

    def authorized?(id:, **args)
      requires_specialist!
      interview = Interview.find_by!(uid: id)
      policy = InterviewPolicy.new(current_user, interview)
      ApiError.not_authorized("You do not have permission to schedule this interview") unless policy.schedule?
      ApiError.invalid_request("INTERVIEW_IS_NOT_SCHEDULABLE", "Interview is not in a schedulable state.") unless ALLOWED_STATUES.include?(interview.status)
      ApiError.invalid_request("STARTS_AT_NOT_AVAILABLE_ON_CLIENT", "Argument `starts_at` is not inside of the client's availability.") unless interview.user.availability.include?(args[:starts_at])
      true
    end

    def resolve(**args)
      interview = Interview.find_by!(uid: args[:id])

      current_account_responsible_for do
        interview.update!(
          starts_at: args[:starts_at],
          call_scheduled_at: Time.current,
          status: "Call Scheduled"
        )
      end

      interview.create_video_call! if interview.video_call.blank?
      interview.application.update(status: "Interview Scheduled")
      interview.application.project.update(status: "Interview Scheduled")
      update_specialist_number(interview.application.specialist, args[:phone_number]) if args[:phone_number]
      create_system_message!(interview)

      {interview: interview}
    end

    private

    def update_specialist_number(specialist, number)
      return if specialist.phone == number

      specialist.update(phone: number)
      specialist.sync_to_airtable
    end

    def create_system_message!(interview)
      specialist_acc = interview.specialist.account
      user_acc = interview.user.account
      conversation = Conversation.by_accounts([specialist_acc, user_acc])
      conversation.new_message!(nil, "#{specialist_acc.name} & #{user_acc.name},\n\nNow that you've scheduled a call, you can use this thread to communicate.\n\nIf you have any questions or issues, don't hesitate to contact the Advisable team at hello@advisable.com.")
    end
  end
end
