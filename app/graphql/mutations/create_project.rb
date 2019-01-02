class Mutations::CreateProject < Mutations::BaseMutation
  argument :primary_skill, String, required: true
  argument :service_type, String, required: true

  field :project, Types::ProjectType, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    if context[:current_user].nil?
      return {
        errors: [
          { code: "authentication.required" }
        ]
      }
    end

    {
      project: Projects::Create.call(
        user: context[:current_user],
        attributes: args.except(:id, :client_mutation_id),
      )
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
