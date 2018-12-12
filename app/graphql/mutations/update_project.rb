class Mutations::UpdateProject < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :goals, [String], required: false
  argument :primary_skill, String, required: false
  argument :description, String, required: false
  argument :company_description, String, required: false
  argument :specialist_description, String, required: false
  argument :questions, [String], required: false
  argument :required_characteristics, [String], required: false
  argument :optional_characteristics, [String], required: false
  argument :accepted_terms, Boolean, required: false

  field :project, Types::ProjectType, null: true
  field :errors, String, null: true

  def resolve(**args)
    {
      project: Projects::Update.call(
        project: Project.find_by_airtable_id(args[:id]),
        attributes: args.except(:id, :client_mutation_id),
      )
    }

    rescue Service::Error => e
      return { error: e.message }
  end
end
