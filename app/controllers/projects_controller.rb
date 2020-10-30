class ProjectsController < ApplicationController
  attr_reader :project

  skip_before_action :verify_authenticity_token
  before_action :verify_key, :load_project

  def send_invites
    if ["Open", "Pending"].exclude?(project.sales_status)
      render json: {error: "Can't send invites: Project is in #{project.sales_status} state."}, status: :unprocessable_entity
    elsif project.primary_skill.blank?
      render json: {error: "Can't send invites: Project does not have primary skill defined."}, status: :unprocessable_entity
    else
      SendApplicationInformationJob.perform_later(project)
      render json: {status: "Invites scheduled to be sent out."}
    end
  end

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
