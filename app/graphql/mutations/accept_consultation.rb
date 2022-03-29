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
        interview = consultation.create_interview(status: "Call Requested", user: consultation.user, specialist: consultation.specialist)
        consultation.update(interview:, status: "Accepted By Specialist", accepted_at: Time.zone.now)

        {interview:, consultation:}
      end
    end
  end
end
