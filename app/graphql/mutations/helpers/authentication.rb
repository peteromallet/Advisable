module Mutations::Helpers::Authentication
  def login_as(account)
    account.generate_remember_token
    cookies = context[:cookies]
    cookies.signed[:remember] = {
      value: account.remember_token, httponly: true, expires: 2.weeks.from_now
    }

    session = context[:session]
    session[:account_uid] = account.uid
  end

  def logout
    cookies = context[:cookies]
    cookies.delete(:remember)
    session = context[:session]
    session.delete(:account_uid)
  end
end
