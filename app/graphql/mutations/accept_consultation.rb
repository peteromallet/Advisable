class Mutations::AcceptConsultation < Mutations::BaseMutation
  argument :consultation, ID, required: true

  field :interview, Types::Interview, null: true

  def resolve(**args)
    ActiveRecord::Base.transaction do
      consultation =
        Consultation.find_by_uid_or_airtable_id!(args[:consultation])

      project = get_project(consultation)
      application = create_application(project, consultation.specialist)
      interview = create_interview(application)
      consultation.update(
        interview: interview,
        status: 'Accepted By Specialist',
        accepted_at: Time.zone.now
      )
      consultation.sync_to_airtable
      {interview: interview}
    end
  end

  private

  def get_project(consultation)
    user = consultation.user
    project =
      user.projects.joins(project_skills: :skill).where(
        project_skills: {
          primary: true, skills: {name: consultation.skill.name}
        }
      ).first
    project = create_new_project(consultation) if project.nil?
    project
  end

  def create_new_project(consultation)
    project =
      Project.create(
        user: consultation.user,
        skills: [consultation.skill],
        sales_status: 'Open',
        status: 'Project Created',
        service_type: 'Consultation',
        primary_skill: consultation.skill,
        owner: ENV['CONSULTATION_PROJECT_OWNER'],
        name: "#{consultation.user.company_name} - #{consultation.skill.name}"
      )
    project.sync_to_airtable
    project
  end

  def create_application(project, specialist)
    application =
      Application.create(
        project: project, status: 'Applied', score: 90, specialist: specialist
      )
    application.sync_to_airtable({'Source' => 'consultation-request'})
    application
  end

  def create_interview(application)
    interview =
      application.interviews.create(
        {status: 'Call Requested', user: application.project.user}
      )
    interview.sync_to_airtable
    interview
  end
end
