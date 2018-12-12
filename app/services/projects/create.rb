class Projects::Create < ApplicationService
  attr_reader :client, :skills, :project

  def initialize(client:, skills:)
    @client = client
    @skills = skills
  end

  def call
    @project = client.projects.new(
      skills: skills,
      status: "Brief Pending Confirmation",
      primary_skill: skills.first.name,
      name: "#{client.name} - #{skills.first.name}"
    )

    sync_with_airtable if project.save
    project
  end

  private

  def sync_with_airtable
    record = Airtable::Project.new(
      "Client" => [client.airtable_id],
      "Skills Required" => project.skills.map(&:airtable_id),
      "Project Stage" => "Brief Pending Confirmation",
      "Primary Skill Required" => project.skills.first.name
    )
    record.create
    project.airtable_id = record.id
    project.save(validate: false)
  end
end