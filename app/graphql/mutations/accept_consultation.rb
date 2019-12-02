class Mutations::AcceptConsultation < Mutations::BaseMutation
  argument :consultation, ID, required: true

  field :interview, Types::Interview, null: true

  def resolve(**args)
    ActiveRecord::Base.transaction do
      consultation = Consultation.find_by_uid_or_airtable_id!(args[:consultation])
      project = create_project(consultation)
      application = create_application(project, consultation.specialist)
      interview = create_interview(application)
      consultation.update(interview: interview, status: "Accepted By Specialist")
      consultation.sync_to_airtable
      { interview: interview }
    end
  end

  private

  def create_project(consultation)
    user = consultation.user
    skill_records = skills(consultation)
    project = user.projects.create({
      skills: skill_records,
      sales_status: "Open",
      status: "Project Created",
      service_type: "Consultation",
      primary_skill: skill_records.first.name,
      name: "#{user.company_name} - #{skill_records.first.name}"
    })
    project.sync_to_airtable
    project
  end

  def create_application(project, specialist)
    application = project.applications.create({
      status: "Applied",
      specialist: specialist
    })
    application.sync_to_airtable
    application
  end

  def create_interview(application)
    interview = application.interviews.create({
      status: "Call Requested",
      user: application.project.user,
    })
    interview.sync_to_airtable
    interview
  end

  def skills(consultation)
    @skills ||= consultation.skills.map do |c|
      Skill.find_by_airtable_id(c)
    end
  end
end
