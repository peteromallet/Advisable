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

    if project.save
      project.sync_to_airtable
      return project
    end

    raise Service::Error.new(project.errors.full_messages.first)
  end
end