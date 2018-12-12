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
    project.assign_attributes(attributes.except(:skills))

    if attributes[:skills]
      skills = Skill.where(uid: attributes[:skills])
      project.skills = skills
      project.primary_skill = skills.first.try(:name)
    end

    if project.save
      sync_with_airtable
      return project
    end

    raise Service::Error.new(project.errors.full_messages.first)
  end
  
  private

  def sync_with_airtable
    record = Airtable::Project.find(project.airtable_id)
    record['Skills Required'] = project.skills.map(&:airtable_id)
    record['Primary Skill Required'] = project.skills.first.try(:name)
    record['Company Description'] = project.company_description
    record['Project Description'] = project.description
    record['Specialist Requirement Description'] = project.specialist_description
    record['Goals'] = project.goals.to_json
    record['Required Characteristics'] = project.required_characteristics.to_json
    record['Optional Characteristics'] = project.optional_characteristics.to_json
    record['Qualification Question 1'] = project.questions.try(:[], 0)
    record['Qualification Question 2'] = project.questions.try(:[], 1)
    record['Accepted Terms'] = project.accepted_terms
    record.save
  end
end