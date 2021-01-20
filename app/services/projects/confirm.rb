# frozen_string_literal: true

class Projects::Confirm < ApplicationService
  attr_reader :project

  ALLOWED_STATSUES = ["Brief Pending Confirmation", "Brief Confirmed"].freeze

  def initialize(project:)
    @project = project
  end

  def call
    unless ALLOWED_STATSUES.include?(project.status)
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
