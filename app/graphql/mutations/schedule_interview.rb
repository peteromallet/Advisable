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
      specialist = interview.application.specialist
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
      update_specialist_number(specialist, args[:phone_number]) if args[:phone_number]
      interview.create_system_message!
      interview.create_google_calendar_event

      unless specialist.account.completed_tutorial?("introductory_call")
        SpecialistMailer.first_interview_scheduled(interview).deliver_later
        specialist.account.complete_tutorial("introductory_call")
      end

      {interview: interview}
    end

    private

    def update_specialist_number(specialist, number)
      return if specialist.phone == number

      specialist.update(phone: number)
      specialist.sync_to_airtable
    end
  end
end
