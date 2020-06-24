require 'capybara'
require 'capybara/rspec'

Capybara.server = :puma, { Silent: true }
Capybara.enable_aria_label = true

RSpec.configure do |config|
  config.retry_callback = ->(ex) { Capybara.reset! if ex.metadata[:js] }

  config.before(:each, type: :system) do
    driven_by :selenium, using: :headless_chrome
    # driven_by :selenium, using: :chrome
  end
end
