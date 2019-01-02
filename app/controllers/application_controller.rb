class ApplicationController < ActionController::Base
  protected

  def current_user
    Users::Authenticate.call(token: auth_token)
  end

  def auth_token
    header = request.headers['Authorization']
    header.gsub("Bearer ", "") unless header.blank?
  end
end
