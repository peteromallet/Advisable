# frozen_string_literal: true

class Projects::Confirm < ApplicationService
  attr_reader :project

  def initialize(project:)
    @project = project
  end

  def call
    return project if project.status == 'Brief Confirmed'

    if project.status != 'Brief Pending Confirmation'
      raise Service::Error.new("project.not_pending_approval")
    end

    if project.deposit_owed.positive?
      raise Service::Error.new("project.deposit_not_paid")
    end

    if project.update(status: "Brief Confirmed")
      project.sync_to_airtable
      return project
    end

    raise Service::Error.new(project.errors.full_messages.first)
  end
end
