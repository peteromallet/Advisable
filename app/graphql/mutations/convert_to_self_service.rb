class Mutations::ConvertToSelfService < Mutations::BaseMutation
  argument :id, ID, required: true

  field :project, Types::ProjectType, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    project = Project.find_by_airtable_id!(args[:id])

    if project.status != "Project Created"
      raise Service::Error.new("projects.statusNotCreated")
    end

    if project.service_type == "Self-Service"
      raise Service::Error.new("projects.alreadySelfService")
    end

    project.assign_attributes(
      service_type: "Self-Service",
      status: "Brief Pending Confirmation"
    )

    project.sync_to_airtable if project.save

    { project: project }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
