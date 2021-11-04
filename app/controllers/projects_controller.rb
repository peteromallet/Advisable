# frozen_string_literal: true

class ProjectsController < ApplicationController
  attr_reader :project

  skip_before_action :verify_authenticity_token
  before_action :verify_key, :load_project

  def create_linkedin_ad
    if AuthProvider.linkedin_ads.any?
      CreateLinkedinAdJob.perform_later(project)
      render json: {status: "LinkedIn Ad creation was scheduled."}
    else
      render json: {error: "No LinkedIn identities exist. Go to Admin panel to log in with LinkedIn."}, status: :unprocessable_entity
    end
  end

  private

  def verify_key
    return if params[:key].present? && params[:key] == ENV["PROJECTS_INVITE_KEY"]

    render json: {error: "You are not authorized to perform this action."}, status: :unauthorized
  end

  def load_project
    @project = Project.find_by_uid_or_airtable_id!(params[:project_id])
    project.sync_from_airtable if project.airtable_id
  end
end
