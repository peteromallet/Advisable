class Projects::Confirm < ApplicationService
  attr_reader :project
  
  def initialize(project:)
    @project = project
  end

  def call
    if project.status != 'Brief Pending Confirmation'
      raise Service::Error.new("project.not_pending_approval")
    end

    if project.deposit_owed > 0
      raise Service::Error.new("project.deposit_not_paid")
    end

    if project.update_attributes(status: "Brief Confirmed")
      sync_with_airtable
      return project
    end

    raise Service::Error.new(project.errors.full_messages.first)
  end
  
  private

  def sync_with_airtable
    record = Airtable::Project.find(project.airtable_id)
    record['Project Stage'] = "Brief Confirmed"
    record.save
  end
end