# Handles the submission of an application
class Applications::Submit < ApplicationService
  attr_reader :application

  def initialize(application)
    @application = application
  end

  def call
    is_submittable?
    application.status = 'Applied'
    application.save
    application
  end

  private

  def is_submittable?
    return if application.status == 'Invited To Apply'
    message = "Cannot submit application with status of #{application.status}"
    raise Service::Error.new(message)
  end
end