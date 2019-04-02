class ApplicationController < ActionController::Base
  def frontend
    respond_to do |format|
      format.html
    end

    rescue ActionController::UnknownFormat
      render status: 404, json: { error: "Not Found" }
  end

  protected

  def current_user
    Accounts::Authenticate.call(auth_token)
  end

  def auth_token
    header = request.headers['Authorization']
    header.gsub("Bearer ", "") unless header.blank?
  end
end
