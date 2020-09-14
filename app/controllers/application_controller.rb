class ApplicationController < ActionController::Base
  before_action :set_sentry_context
  helper_method :user_logged_in?, :current_user
    
  def frontend
    respond_to(&:html)
  rescue ActionController::UnknownFormat
    render status: 404, json: {error: 'Not Found'}
  end

  def guild
  end

  protected

  def user_logged_in?
    current_user.present?
  end

  def current_user
    session_manager.current_user
  end

  def session_manager
    @session_manager ||= SessionManager.new(session: session, cookies: cookies)
  end

  def client_ip
    request.env['HTTP_X_FORWARDED_FOR'].try(:split, ',').try(:first) ||
      request.env['REMOTE_ADDR']
  end

  private

  def set_sentry_context
    user = current_user

    if user.present?
      Raven.user_context(
        id: current_user.id,
        email: current_user.email,
        username: current_user.name
      )
    else
      Raven.user_context(nil)
    end
  end
end
