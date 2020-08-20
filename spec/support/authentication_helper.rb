module AuthenticationHelper
  # This should be used instead of login_as, as it also will store
  # a JWT for the user in local storage
  def authenticate_as(account)
    allow_any_instance_of(SessionManager).to receive(:current_user).and_return(
      account
    )
  end
end
