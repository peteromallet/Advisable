# frozen_string_literal: true

class Mutations::UpdateConsultation < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :topic, String, required: true

  field :consultation, Types::ConsultationType, null: true

  ALLOWED_STATUSES = ['Request Started', 'Request Completed'].freeze

  def resolve(**args)
    consultation = Consultation.find_by_uid_or_airtable_id!(args[:id])

    unless ALLOWED_STATUSES.include?(consultation.status)
      ApiError.invalid_request("consultations.failedToUpdate", "Can't update the consultation becaue its status is #{consultation.status}")
    end

    consultation.topic = args[:topic]

    consultation.save
    consultation.sync_to_airtable
    {consultation: consultation}
  end
end
