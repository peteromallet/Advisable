class Mutations::RejectApplicationInvitation < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :reason, String, required: true

  field :application, Types::ApplicationType, null: true
  field :errors, [String], null: false

  def resolve(**args)
    begin
      return {
        application: Applications::RejectApplicationInvitation.call(
          application_id: args[:id],
          reason: args[:reason]
        ),
      }
    rescue ActiveRecord::RecordNotFound => er
      GraphQL::ExecutionError.new("Could not find application #{args[:id]}")
    end
  end
end
