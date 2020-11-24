# Handles the submission of an application
class Applications::Submit < ApplicationService
  attr_reader :application, :current_account_id

  def initialize(application, current_account_id: nil)
    @application = application
    @current_account_id = current_account_id
  end

  def call
    applications_open?
    is_submittable?
    application.status = 'Applied'
    application.applied_at = Time.zone.now if application.applied_at.blank?

    success = Logidze.with_responsible(current_account_id) do
      application.save
    end

    application.sync_to_airtable if success
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
