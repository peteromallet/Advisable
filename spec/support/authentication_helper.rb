module AuthenticationHelper
  def authenticate_as(account)
    allow_any_instance_of(SessionManager).to receive(:current_user).and_return(
      account
    )
  end
end
