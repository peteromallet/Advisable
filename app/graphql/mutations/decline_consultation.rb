# frozen_string_literal: true

module Mutations
  class DeclineConsultation < Mutations::BaseMutation
    argument :consultation, ID, required: true
    argument :reason, String, required: false

    field :consultation, Types::ConsultationType, null: true

    def authorized?(consultation:, **_args)
      requires_specialist!

      consultation = Consultation.find_by_uid_or_airtable_id!(consultation)
      ConsultationPolicy.new(current_user, consultation).decline?
    end

    def resolve(consultation:, reason: nil)
      consultation = Consultation.find_by_uid_or_airtable_id!(consultation)
      create_system_message(consultation)
      message = create_user_message(consultation, reason)
      send_user_email(consultation, message)
      consultation.update(
        status: "Specialist Rejected",
        rejected_at: Time.zone.now,
        rejection_reason: reason
      )
      {consultation:}
    end

    private

    def send_user_email(consultation, message)
      return if message.nil?

      UserMailer.consultation_declined(consultation, message).deliver_later
    end

    def create_system_message(consultation)
      return if consultation.messages.none?

      consultation.messages.first.conversation.new_message!(
        nil,
        nil,
        kind: "ConsultationDeclined",
        consultation:,
        send_emails: false
      )
    end

    def create_user_message(consultation, reason)
      return if reason.nil? || consultation.messages.none?

      consultation.messages.first.conversation.new_message!(
        current_user.account,
        reason,
        send_emails: false
      )
    end
  end
end
