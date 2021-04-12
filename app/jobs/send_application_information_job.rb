# frozen_string_literal: true

require 'open-uri'

class SendApplicationInformationJob < ApplicationJob
  queue_as :default

  attr_reader :project

  def perform(project)
    @project = project
    project.sync_from_airtable if project.airtable_id

    specialists = Specialist.
      joins(:account).
      available.
      where(account: {deleted_at: nil}).
      where(id: specialist_ids_by_skill).
      where.not(id: specialists_with_existing_applications)

    specialists = specialists.where(country_id: project.user.country_id) if project.location_importance.to_i > 1

    specialists.each do |specialist|
      SpecialistMailer.inform_about_project(project.id, specialist.id).deliver_later
    end
  end

  private

  def specialist_ids_by_skill
    primary_skill = project.primary_skill.specialists.pluck(:id)
    previous_projects = project.primary_skill.previous_projects.pluck(:specialist_id)
    primary_skill | previous_projects
  end

  def specialists_with_existing_applications
    project.applications.pluck(:specialist_id)
  end
end
