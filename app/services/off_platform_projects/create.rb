class OffPlatformProjects::Create < ApplicationService
  attr_accessor :specialist, :attributes, :project

  def initialize(specialist:, attributes: {})
    @specialist = specialist
    @attributes = attributes
  end

  def call
    self.project = specialist.off_platform_projects.new(attributes.except(:skills))
    associate_skills
    if project.save
      record = Airtable::OffPlatformProject.new({})
      record.push(project)
    end

    project
  end

  private

  def associate_skills
    attributes[:skills].each do |skill|
      record = Skill.find_by_name(skill)
      record = Airtable::Skill.find_by_name(skill).sync if record.nil?
      project.skills << record
    end
  end

  def self.test
    call(
      specialist_id: 1,
      client_name: "Apple Inc",
      confidential: false,
      industry: "Tech",
      client_description: "Blah blah blah",
      skills: [
        "Facebook Marketing",
        "International Marketing"
      ],
      requirements: "requirements...",
      description: "description...",
      results: "results...",
      contact_name: "Thomas Cullen",
      contact_job_title: "Developer",
      contact_email: "hello@thomascullen.io",
      can_contact: false,
      validation_method: "Linkedin",
      validation_url: "..."
    )
  end
end