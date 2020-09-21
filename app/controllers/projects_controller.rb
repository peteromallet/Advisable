class ProjectsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :send_invites

  def send_invites
    if params[:key].present? && params[:key] == ENV['PROJECTS_INVITE_KEY']
      project = Project.find_by_uid_or_airtable_id!(params[:project_id])
      project.sync_from_airtable

      if project.status == "Brief Confirmed"
        SendApplicationInformationJob.perform_later(project)

        render json: {status: "Invites scheduled to be sent out."}
      else
        render json: {error: "Can't send invites. Project not in 'Brief Confirmed' state."}, status: :unprocessable_entity
      end
    else
      render json: {error: "You are not authorized to perform this action."}, status: :unauthorized
    end
  end
end
