class Mutations::RejectApplicationInvitation < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :reason, String, required: true

  field :application, Types::ApplicationType, null: true
  field :errors, [String], null: true

  def resolve(**args)
    {
      application: Applications::RejectApplicationInvitation.call(
        application_id: args[:id],
        reason: args[:reason]
      ),
    }
  end
end
