require 'webmock/rspec'

# Disable any external requests
WebMock.disable_net_connect!(
  { allow_localhost: true, allow: 'chromedriver.storage.googleapis.com' }
)
