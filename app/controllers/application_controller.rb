class ApplicationController < ActionController::Base
  protected

  def current_user
    Users::Authenticate.call(token: auth_token)
  end

  def auth_token
    # If the token was passed in the header then use that token
    header = request.headers['Authorization']
    return header.gsub("Bearer ", "") if header
    # Otherwise check if there is a token in session storage
    session[:auth_token]
  end
end
