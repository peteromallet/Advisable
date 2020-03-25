class Mutations::CreateOffPlatformProject < Mutations::BaseMutation
  # TODO: Eventually the specialist ID should be removed and this mutation should expect a specialist to be logged in.
  argument :specialist, ID, required: true
  argument :client_name, String, required: true
  argument :confidential, Boolean, required: false
  argument :industries, [String], required: true
  argument :primaryIndustry, String, required: true
  argument :skills, [String], required: true
  argument :primarySkill, String, required: true
  argument :contact_name, String, required: true
  argument :contact_job_title, String, required: true
  argument :contact_relationship, String, required: true
  argument :company_type, String, required: true
  argument :description, String, required: true
  argument :goal, String, required: true
  argument :public_use, Boolean, required: true

  field :previous_project, Types::PreviousProject, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    specialist = Specialist.find_by_uid_or_airtable_id!(args[:specialist])
    project =
      specialist.off_platform_projects.new(
        {
          client_name: args[:client_name],
          confidential: args[:confidential],
          contact_name: args[:contact_name],
          contact_job_title: args[:contact_job_title],
          contact_relationship: args[:contact_relationship],
          company_type: args[:company_type],
          description: args[:description],
          goal: args[:goal],
          public_use: args[:public_use],
          validation_status: 'Pending'
        }
      )

    args[:skills].each do |skill|
      project.project_skills <<
        ProjectSkill.new(
          skill: Skill.find_by_name!(skill),
          primary: args[:primary_skill] == skill
        )
    end

    args[:industries].each do |industry|
      project.project_industries <<
        ProjectIndustry.new(
          industry: Industry.find_by_name!(industry),
          primary: args[:primary_industry] == industry
        )
    end

    project.save
    project.sync_to_airtable

    SpecialistMailer.verify_project(project.uid).deliver_later

    {
      previous_project:
        PreviousProject.new(specialist: project.specialist, project: project)
    }
  end
end
