class Projects::Create < ApplicationService
  attr_reader :user, :project

  def initialize(user:, attributes:)
    @user = user
    @project = user.projects.new(attributes)
  end

  def call
    raise Service::Error.new("Invalid skill") unless skill.present?
    project.skills << skill
    project.status = project_status
    project.name = "#{user.company_name} - #{project.primary_skill}"
    if project.save
      project.sync_to_airtable({
        "Project Status" => "Open",
      })
      return project
    end
  end

  private

  def skill
    @skill ||= (Skill.find_by_name(project.primary_skill) || sync_skill_from_airtable)
  end

  def sync_skill_from_airtable
    s = ::Airtable::Skill.find_by_name(project.primary_skill)
    return nil if s.nil?
    s.sync
  end

  def project_status
    return "Brief Pending Confirmation" if project.service_type == "Self-Service"
    "Project Created"
  end
end