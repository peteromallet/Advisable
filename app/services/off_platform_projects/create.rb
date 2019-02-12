class OffPlatformProjects::Create < ApplicationService
  attr_accessor :specialist, :attributes, :project

  def initialize(specialist:, attributes: {})
    @specialist = specialist
    @attributes = attributes
  end

  def call
    self.project = specialist.off_platform_projects.new(attributes.except(:skills))
    set_validation_status
    associate_skills
    if project.save
      record = Airtable::OffPlatformProject.new({})
      record.push(project)
    end

    project
  end

  private

  def set_validation_status
    unless ["Client", "None"].include?(project.validation_method)
      project.validated_by_client = true
    end

    if project.validation_method == "None"
      project.validation_status = "Validation Failed"
    else
      project.validation_status = "Pending"
    end
  end

  def associate_skills
    project.primary_skill = attributes[:skills].first
    attributes[:skills].each do |skill|
      record = Skill.find_by_name(skill)
      record = Airtable::Skill.find_by_name(skill).sync if record.nil?
      project.skills << record
    end
  end
end