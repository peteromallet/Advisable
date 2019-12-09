module AuthenticationHelper
  # This should be used instead of login_as, as it also will store
  # a JWT for the user in local storage
  def authenticate_as(user)
    visit '/login'
    jwt = Accounts::Jwt.call(user)
    Capybara.current_session.driver.browser.manage.add_cookie(:name => "authToken", :value => jwt)
  end
end
