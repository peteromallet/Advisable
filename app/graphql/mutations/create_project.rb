class Mutations::CreateProject < Mutations::BaseMutation
  argument :skills, [String], required: true

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
        client: context[:current_user].client,
        skills: Skill.where(uid: args[:skills])
      )
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
