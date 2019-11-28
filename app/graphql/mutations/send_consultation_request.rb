class Mutations::SendConsultationRequest < Mutations::BaseMutation
  argument :consultation, ID, required: true
  argument :topic, String, required: true

  field :consultation, Types::ConsultationType, null: true

  def resolve(**args)
    consultation = Consultation.find_by_uid_or_airtable_id!(args[:consultation])
    consultation.update(
      status: "Request Started",
      topic: args[:topic]
    )

    consultation.sync_to_airtable
    { consultation: consultation }
  end
end
