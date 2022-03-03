# frozen_string_literal: true

module Mutations
  class AcceptConsultation < Mutations::BaseMutation
    argument :consultation, ID, required: true

    field :interview, Types::Interview, null: true
    field :consultation, Types::ConsultationType, null: true

    def authorized?(consultation:)
      requires_specialist!

      consultation = Consultation.find_by!(uid: consultation)
      ConsultationPolicy.new(current_user, consultation).accept?
    end

    def resolve(consultation:)
      ActiveRecord::Base.transaction do
        consultation = Consultation.find_by!(uid: consultation)
        application = create_application(consultation.specialist)
        interview = application.create_interview(status: "Call Requested", user: consultation.user)
        consultation.update(
          interview:,
          status: "Accepted By Specialist",
          accepted_at: Time.zone.now
        )
        {interview:, consultation:}
      end
    end

    private

    def create_application(specialist)
      current_account_responsible_for do
        Application.create(
          status: "Applied",
          score: 90,
          specialist:,
          trial_program: true,
          source: "consultation-request"
        )
      end
    end
  end
end
