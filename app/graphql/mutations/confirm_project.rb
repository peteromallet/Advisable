class Mutations::ConfirmProject < Mutations::BaseMutation
  argument :id, ID, required: true

  field :project, Types::ProjectType, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    {
      project: Projects::Confirm.call(
        project: Project.find_by_uid_or_airtable_id(args[:id]),
      )
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
