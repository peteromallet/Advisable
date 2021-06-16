# frozen_string_literal: true

module Mutations
  class UpdateConsultation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :topic, String, required: true

    field :consultation, Types::ConsultationType, null: true

    ALLOWED_STATUSES = ['Request Started', 'Request Completed'].freeze

    def authorized?(id:, **_args)
      requires_client!

      consultation = Consultation.find_by_uid_or_airtable_id!(id)
      ConsultationPolicy.new(current_user, consultation).update?
    end

    def resolve(**args)
      consultation = Consultation.find_by_uid_or_airtable_id!(args[:id])

      ApiError.invalid_request("CONSULTATIONS_FAILED_TO_UPDATE", "Can't update the consultation becaue its status is #{consultation.status}") unless ALLOWED_STATUSES.include?(consultation.status)

      consultation.topic = args[:topic]

      consultation.save
      {consultation: consultation}
    end
  end
end
