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
    @current_user ||= admin_override || current_account&.specialist_or_user
  end

  def current_account
    @current_account ||=
      begin
        uid = session[:account_uid]
        if uid
          if uid&.starts_with?('acc_')
            return Account.find_by(uid: uid)
          else
            clear_browser_data
          end
        end
        restore_session
      end
  end

  def restore_session
    token = cookies.signed[:remember]
    return unless token
    account = Account.find_by(remember_token: token)
    account ? start_session(account) : cookies.delete(:remember)
    account
  end

  def start_session(account)
    @current_account = account
    session[:account_uid] = account.uid
  end

  def login(account)
    account.generate_remember_token
    cookies.signed[:remember] = {value: account.remember_token, httponly: true, expires: 2.weeks.from_now}

    start_session(account)
  end

  def logout
    if admin_override
      session.delete(:admin_override)
    else
      current_account&.clear_remember_token
      clear_browser_data
      @current_account = nil
    end
  end

  private

  def admin_override
    return unless current_account&.has_permission?("admin")

    user = GlobalID::Locator.locate(session[:admin_override])
    return user if user.respond_to?(:account)

    session.delete(:admin_override)
    nil
  end

  def clear_browser_data
    cookies.delete(:remember)
    session.delete(:account_uid)
  end
end
