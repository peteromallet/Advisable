module Mutations::Helpers::Authentication
  def session_manager
    context[:session_manager]
  end

  def login_as(account)
    session_manager.login(account)
  end

  def logout
    session_manager.logout
  end
end
