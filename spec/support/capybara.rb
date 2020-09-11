require 'capybara'
require 'capybara/rspec'

Capybara.server = :puma, { Silent: true }
Capybara.enable_aria_label = true
Capybara.default_max_wait_time = 5

RSpec.configure do |config|
  config.retry_callback = ->(ex) { Capybara.reset! if ex.metadata[:js] }

  config.before(:each, type: :system) do
    if ENV['HEADLESS'] == 'false'
      driven_by :selenium, using: :chrome
    else
      driven_by :selenium, using: :headless_chrome
    end
  end
end
