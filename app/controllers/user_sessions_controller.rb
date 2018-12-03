# Handles requests for user sessions API.
class UserSessionsController < ApplicationController
  # POST /api/v1/login
  def create
    token = Users::Login.call(
      email: params[:email],
      password: params[:password]
    )
    # store the JWT in session
    session[:auth_token] = token
    # return the JWT as a token
    render json: { token: token }

    rescue Service::Error => e
      render json: { error: e.code }, status: :unauthorized
  end

  # DELETE /api/v1/logout
  def destroy
    session.delete(:auth_token)
    head :no_content
  end
end