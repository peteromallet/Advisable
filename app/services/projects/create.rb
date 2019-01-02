class Projects::Create < ApplicationService
  attr_reader :user, :project

  def initialize(user:, attributes:)
    @user = user
    @project = user.projects.new(attributes)
  end

  def call
    raise Service::Error.new("Invalid skill") unless skill.present?
    project.status = project_status
    project.name = "#{user.company_name} - #{project.primary_skill}"
    sync_with_airtable if project.save
    project
  end

  private

  def skill
    Skill.find_by_name(project.primary_skill)
  end

  def project_status
    return "Brief Pending Confirmation" if project.service_type == "Self-Service"
    "Project Created"
  end

  def sync_with_airtable
    record = Airtable::Project.new(
      "Client Contacts" => [user.airtable_id],
      "Skills Required" => [skill.airtable_id],
      "Project Stage" => project.status,
      "Service Type" => project.service_type,
      "Primary Skill Required" => project.primary_skill
    )
    record.create
    project.airtable_id = record.id
    project.save(validate: false)
  end
end