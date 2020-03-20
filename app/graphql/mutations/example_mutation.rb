class Mutations::ExampleMutation < Mutations::BaseMutation
  argument :message, String, required: true

  field :specialist, Types::SpecialistType, null: true

  def resolve(message:)
    { specialist: Specialist.first }
  end
end
