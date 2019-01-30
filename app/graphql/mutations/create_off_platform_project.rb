class Mutations::CreateOffPlatformProject < Mutations::BaseMutation
  argument :specialist_id, ID, required: true
  argument :client_name, String, required: true
  argument :confidential, Boolean, required: false
  argument :industry, String, required: true
  argument :client_description, String, required: true
  argument :skills, [String], required: true
  argument :requirements, String, required: true
  argument :results, String, required: true
  argument :contact_name, String, required: true
  argument :contact_job_title, String, required: true
  argument :contact_email, String, required: true
  argument :can_contact_client, Boolean, required: false
  argument :contact_role, String, required: true

  field project:, Types::OffPlatformProject, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    begin
      project = OffPlatformProjects::Create.call(args)
      return { project: project }
    rescue Service::Error => e
      return { errors: [e] }
    end
  end
end
