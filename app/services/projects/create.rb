class Projects::Create < ApplicationService
  attr_reader :client, :project

  def initialize(client:, attributes:)
    @client = client
    @project = client.projects.new(attributes)
  end

  def call
    raise Service::Error.new("Invalid skill") unless skill.present?
    project.status = "Brief Pending Confirmation"
    project.name = "#{client.name} - #{project.primary_skill}"
    sync_with_airtable if project.save
    project
  end

  private

  def skill
    Skill.find_by_name(project.primary_skill)
  end

  def sync_with_airtable
    record = Airtable::Project.new(
      "Client" => [client.airtable_id],
      "Skills Required" => [skill.airtable_id],
      "Project Stage" => "Brief Pending Confirmation",
      "Primary Skill Required" => project.primary_skill
    )
    record.create
    project.airtable_id = record.id
    project.save(validate: false)
  end
end