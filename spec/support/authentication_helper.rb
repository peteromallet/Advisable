module AuthenticationHelper
  # This should be used instead of login_as, as it also will store
  # a JWT for the user in local storage
  def authenticate_as(user)
    visit '/login'
    jwt = Users::CreateToken.call(user: user)
    Capybara.execute_script("localStorage.setItem('authToken', '#{jwt}')")
  end
end
