class Projects::Confirm < ApplicationService
  attr_reader :project
  
  def initialize(project:)
    @project = project
  end

  def call
    if project.status != 'Project Pending Approval'
      raise Service::Error.new("Project is not pending approval")
    end

    if project.deposit_owed > 0
      raise Service::Error.new("Project deposit has not been paid")
    end

    if project.update_attributes(status: "Project Confirmed")
      sync_with_airtable
      return project
    end

    raise Service::Error.new(project.errors.full_messages.first)
  end
  
  private

  def sync_with_airtable
    record = Airtable::Project.find(project.airtable_id)
    record['Project Stage'] = "Project Confirmed"
    record.save
  end
end