require 'capybara'
require 'capybara/rspec'
require 'capybara/cuprite'

Capybara.server = :puma, { Silent: true }
Capybara.enable_aria_label = true
Capybara.javascript_driver = :cuprite
Capybara.register_driver :cuprite do |app|
  Capybara::Cuprite::Driver.new(
    app,
    window_size: [1200, 800],
    inspector: ENV['INSPECTOR'],
    browser_options: {
      'no-sandbox': nil,
      'headless': nil,
      'disable-gpu': nil,
      'disable-dev-shm-usage': nil
    }
  )
end

RSpec.configure do |config|
  config.retry_callback = ->(ex) { Capybara.reset! if ex.metadata[:js] }

  config.before(:each, type: :system) { driven_by :cuprite }
end
