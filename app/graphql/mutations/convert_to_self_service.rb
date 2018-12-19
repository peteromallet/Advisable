class Mutations::ConvertToSelfService < Mutations::BaseMutation
  argument :id, ID, required: true

  field :project, Types::ProjectType, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    begin
      project = Project.find_by_airtable_id(args[:id])

      project.assign_attributes(
        service_type: "Self-Service",
        status: "Brief Pending Confirmation"
      )

      project.sync_to_airtable if project.save

      return { project: project }
    rescue Service::Error => e
      return { errors: [e] }
    end
  end
end
