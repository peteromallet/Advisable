# Updates a given proejct and syncs the changes to airtable.
#
# @example
#   Projects::Update.call(project: project, attributes: { description: "..." })
#
class Projects::Update < ApplicationService
  attr_reader :project, :attributes
  
  def initialize(project: , attributes: )
    @project = project
    @attributes = attributes
  end

  def call
    project.assign_attributes(attributes)
    project.skills << skill

    if project.save
      project.sync_to_airtable
      return project
    end

    raise Service::Error.new(project.errors.full_messages.first)
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
end