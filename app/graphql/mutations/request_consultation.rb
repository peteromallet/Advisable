# frozen_string_literal: true

module Mutations
  class RequestConsultation < Mutations::BaseMutation
    description "Request a consultation"

    argument :message, String, required: true
    argument :specialist, ID, required: true

    field :consultation, Types::ConsultationType, null: false

    def authorized?(**_args)
      requires_client!
    end

    def resolve(**args)
      specialist = Specialist.find_by!(uid: args[:specialist])

      conversation = Conversation.by_accounts([specialist.account, current_user.account])

      consultation = current_user.consultations.create!(
        status: "Request Completed",
        specialist:,
        skill: specialist.articles.first&.skills&.primary&.first&.skill
      )

      slack_notification(consultation)
      email_notification(consultation)

      conversation.new_message!(
        current_user.account,
        args[:message],
        kind: "ConsultationRequest",
        consultation:,
        send_emails: false
      )

      {consultation:}
    end

    private

    def email_notification(consultation)
      SpecialistMailer.consultation_request(consultation).deliver_later
    end

    def slack_notification(consultation)
      Slack.bg_message(
        channel: "consultation_requests",
        text: "We have a new consultation request for #{consultation.specialist.account.name} from #{consultation.user.name_with_company}."
      )
    end
  end
end
