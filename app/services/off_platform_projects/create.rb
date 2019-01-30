class OffPlatformProjects::Create < ApplicationService
  attr_accessor :attributes, :project

  def initialize(attrs = {})
    @attributes = attrs
  end

  def call
    self.project = specialist.off_platform_projects.new(attributes.except(:skills))
    associate_skills
    project.save
  end

  private

  def specialist
    @specialist ||= Specialist.find(attributes[:specialist_id])
  end

  def associate_skills
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
      contact_email: "hello@thomascullen.io",
      can_contact: false,
      contact_role: "Head of project",
      validation_url: "..."
    )
  end
end