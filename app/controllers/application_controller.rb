class ApplicationController < ActionController::Base
  protected

  def current_user
    Accounts::Authenticate.call(auth_token)
  end

  def auth_token
    header = request.headers['Authorization']
    header.gsub("Bearer ", "") unless header.blank?
  end
end
