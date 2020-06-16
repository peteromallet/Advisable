require 'rspec/rails'

module AuthenticationHelper
  # This should be used instead of login_as, as it also will store
  # a JWT for the user in local storage
  def authenticate_as(user)
    visit '/login'
    jwt = Accounts::Jwt.call(user)
    Capybara.execute_script("localStorage.setItem('authToken', '#{jwt}')")
  end
end


RSpec.configure do |config|
  config.include AuthenticationHelper
end
