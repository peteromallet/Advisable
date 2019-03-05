class Mutations::UpdateProfile < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :bio, String, required: false

  field :specialist, Types::SpecialistType, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    specialist = Specialist.find_by_airtable_id!(args[:id])
    {
      specialist: Specialists::UpdateProfile.call(
        specialist: specialist,
        attributes: args.except(:id)
      )
    }

    rescue Service::Error => e
      return { error: e.message }
  end
end
