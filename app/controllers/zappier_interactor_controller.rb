class ZappierInteractorController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :verify_key!

  def attach_previous_project_image
    previous_project = PreviousProject.find_by!(uid: params[:uid])
    raise ActiveRecord::RecordNotFound if params[:image_url].blank?

    AttachImageJob.perform_later(previous_project, params[:image_url])
    render json: {status: "OK."}
  rescue ActiveRecord::RecordNotFound
    render json: {error: "No image attached."}, status: :unprocessable_entity
  end

  private

  def verify_key!
    return if params[:key].present? && params[:key] == ENV["ACCOUNTS_CREATE_KEY"]

    render json: {error: "You are not authorized to perform this action."}, status: :unauthorized
  end
end
