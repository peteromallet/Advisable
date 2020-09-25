class Mutations::DeclineConsultation < Mutations::BaseMutation
  argument :consultation, ID, required: true
  argument :reason, String, required: false

  field :consultation, Types::ConsultationType, null: true

  def resolve(**args)
    consultation = Consultation.find_by_uid_or_airtable_id!(args[:consultation])
    consultation.update status: 'Specialist Rejected',
                        rejected_at: DateTime.now.utc,
                        rejection_reason: args[:reason]
    consultation.sync_to_airtable
    { consultation: consultation }
  end
end
