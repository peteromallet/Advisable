class Mutations::ConfirmProject < Mutations::BaseMutation
  argument :id, ID, required: true

  field :project, Types::ProjectType, null: true
  field :error, String, null: true

  def resolve(**args)
    {
      project: Projects::Confirm.call(
        project: Project.find_by_airtable_id(args[:id]),
      )
    }

    rescue Service::Error => e
      return { error: e.message }
  end
end
