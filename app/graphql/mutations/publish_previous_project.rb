class Mutations::PublishPreviousProject < Mutations::BaseMutation
  argument :previous_project, ID, required: false
  argument :contact_name, String, required: false
  argument :contact_job_title, String, required: false
  argument :contact_relationship, String, required: false

  field :previous_project, Types::PreviousProject, null: true

  def resolve(**args)
    project = PreviousProject.find_by_uid(args[:previous_project])
    project.update(
      contact_name: args[:contact_name],
      contact_job_title: args[:contact_job_title],
      contact_relationship: args[:contact_relationship],
      draft: false
    )

    SpecialistMailer.verify_project(project.uid).deliver_later

    return { previous_project: project }
  end
end
