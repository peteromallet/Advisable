class ApplicationController < ActionController::Base
  include CurrentUser

  before_action :set_sentry_context
  helper_method :user_logged_in?, :current_user

  def frontend
    respond_to(&:html)
  rescue ActionController::UnknownFormat
    render status: 404, json: {error: 'Not Found'}
  end

  def guild
  end

  def internal
    unless current_user&.has_permission?("admin")
      redirect_to "/"
    end
  end

  def client_ip
    request.env['HTTP_X_FORWARDED_FOR'].try(:split, ',').try(:first) ||
      request.env['REMOTE_ADDR']
  end

  def set_sentry_context
    if current_user.present?
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
