# Handles the submission of an application
class Applications::Submit < ApplicationService
  attr_reader :application

  def initialize(application)
    @application = application
  end

  def call
    is_submittable?
    application.status = 'Applied'
    application.sync_to_airtable if application.save
    application
  end

  private

  def is_submittable?
    return if application.status == 'Invited To Apply'
    # Allow people to change their mind and apply after rejceting an application
    return if application.status == 'Invitation Rejected'
    message = "Cannot submit application with status of #{application.status}"
    raise Service::Error.new(message)
  end
end