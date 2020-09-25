# Handles the submission of an application
class Applications::Submit < ApplicationService
  attr_reader :application

  def initialize(application)
    @application = application
  end

  def call
    applications_open?
    is_submittable?
    application.status = 'Applied'
    application.applied_at = Time.zone.now unless application.applied_at.present?
    application.sync_to_airtable if application.save
    application
  end

  private

  def applications_open?
    return if application.project.applications_open
    raise Service::Error.new("projects.applicationsClosed")
  end

  def is_submittable?
    return if application.status == 'Invited To Apply'
    # Allow people to change their mind and apply after rejceting an application
    return if application.status == 'Invitation Rejected'
    # Allow specialists to re-apply after their applcaiton has been rejected
    return if application.status == 'Application Rejected'
    raise Service::Error.new("applications.cannotSubmit")
  end
end
