class Mutations::SendConsultationRequest < Mutations::BaseMutation
  argument :consultation, ID, required: true
  argument :likely_to_hire, Integer, required: true

  field :consultation, Types::ConsultationType, null: true

  def resolve(**args)
    consultation = Consultation.find_by_uid_or_airtable_id!(args[:consultation])
    consultation.update(
      status: 'Request Completed', likely_to_hire: args[:likely_to_hire]
    )

    consultation.sync_to_airtable
    { consultation: consultation }
  end
end
