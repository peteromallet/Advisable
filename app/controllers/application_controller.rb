class ApplicationController < ActionController::Base
  before_action :set_sentry_context

  def frontend
    respond_to(&:html)
  rescue ActionController::UnknownFormat
    render status: 404, json: { error: 'Not Found' }
  end

  protected

  def current_user
    @current_user ||=
      begin
        if session[:account_uid]
          return Account.find_by_uid(session[:account_uid])
        end
        restore_session
      end
  end

  def restore_session
    token = cookies.signed[:remember]
    return unless token
    account = Account.find_by_remember_token(token)
    if account
      session[:account_uid] = account.uid
    else
      cookies.delete[:remember]
    end

    account
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
