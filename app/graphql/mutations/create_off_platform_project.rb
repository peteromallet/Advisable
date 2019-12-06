class Mutations::CreateOffPlatformProject < Mutations::BaseMutation
  # TODO: Eventually the specialist ID should be removed and this mutation should expect a specialist to be logged in.
  argument :specialist_id, ID, required: true
  argument :client_name, String, required: true
  argument :confidential, Boolean, required: false
  argument :industry, String, required: true
  argument :skills, [String], required: true
  argument :contact_name, String, required: true
  argument :contact_job_title, String, required: true
  argument :company_type, String, required: true
  argument :description, String, required: true
  argument :public_use, Boolean, required: true

  field :previous_project, Types::PreviousProject, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    begin
      specialist = Specialist.find_by_airtable_id!(args[:specialist_id])
      project = OffPlatformProjects::Create.call(
        specialist: specialist,
        attributes: args.except(:specialist_id),
      )

      SpecialistMailer.verify_project(project.uid).deliver_later

      return {
        previous_project: PreviousProject.new(
          specialist: project.specialist,
          project: project
        )
      }
    rescue Service::Error => e
      return { errors: [e] }
    end
  end
end
