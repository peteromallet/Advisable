class Mutations::RequestReferences < Mutations::BaseMutation
  argument :id, ID, required: true

  field :application, Types::ApplicationType, null: true

  def resolve(**args)
    {
      application: Applications::RequestReferences.call({
        application: Application.find_by_airtable_id!(args[:id])
      })
    }
  end
end
