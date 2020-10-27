class ApplicationController < ActionController::Base
  include CurrentUser

  before_action :set_sentry_context
  before_action :authenticate_with_magic_link, only: :frontend

  def frontend
    respond_to(&:html)
  rescue ActionController::UnknownFormat
    render status: 404, json: {error: 'Not Found'}
  end

  def guild
  end

  def internal
    return if current_account&.has_permission?("admin")
    redirect_to "/"
  end

  def client_ip
    request.env['HTTP_X_FORWARDED_FOR'].try(:split, ',').try(:first) ||
      request.env['REMOTE_ADDR']
  end

  def set_sentry_context
    if current_user.present?
      Raven.user_context(
        id: current_user.id,
        email: current_user.account.email,
        username: current_user.account.name
      )
    else
      Raven.user_context(nil)
    end
  end
end
