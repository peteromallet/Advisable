# Provides a simple class that takes the session and cookies objects and
# provides methods for setting the user session. This is passed to the graphql
# context to prevent us having to pass the session and cookies separately. This
# is mostly to make testing easier.
class SessionManager
  attr_reader :session, :cookies

  def initialize(session:, cookies:)
    @session = session
    @cookies = cookies
  end

  def current_user
    @current_user ||=
      begin
        uid = session[:account_uid]
        return SpecialistOrUser.find_by_uid(uid) if uid
        restore_session
      end
  end

  def restore_session
    token = cookies.signed[:remember]
    return unless token
    account = SpecialistOrUser.find_by_remember_token(token)
    account ? start_session(account) : cookies.delete(:remember)
    account
  end

  def start_session(account)
    @current_user = account
    cookies.permanent[:uid] = account.uid
    session[:account_uid] = account.uid
  end

  def login(account)
    account.generate_remember_token
    cookies.signed[:remember] = {
      value: account.remember_token, httponly: true, expires: 2.weeks.from_now
    }

    start_session(account)
  end

  def logout
    current_user.clear_remember_token
    cookies.delete(:uid)
    cookies.delete(:remember)
    session.delete(:account_uid)
    @current_user = nil
  end
end
