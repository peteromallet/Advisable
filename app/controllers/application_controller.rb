class ApplicationController < ActionController::Base
  before_action :set_sentry_context

  def frontend
    respond_to(&:html)
  rescue ActionController::UnknownFormat
    render status: 404, json: { error: 'Not Found' }
  end

  protected

  def current_user
    Accounts::Authenticate.call(auth_token)
  end

  def auth_token
    header = request.headers['Authorization']
    header.gsub('Bearer ', '') unless header.blank?
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
