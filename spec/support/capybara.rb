# frozen_string_literal: true

require "capybara"
require "capybara/rspec"

Capybara.server = :puma, {Silent: true}
Capybara.enable_aria_label = true
Capybara.default_max_wait_time = 5

RSpec.configure do |config|
  config.retry_callback = ->(ex) { Capybara.reset! if ex.metadata[:js] }
  config.before(:each, type: :system) do
    if ENV["BROWSER_PATH"].present?
      Selenium::WebDriver::Chrome.path = ENV["BROWSER_PATH"]
      Webdrivers::Chromedriver.required_version = ENV["CHROMEDRIVER_VERSION"]
    end

    browser = ENV["CAPYBARA_BROWSER"] || "chrome"

    if ENV["HEADLESS"] == "false"
      driven_by :selenium, using: browser.to_sym
    else
      driven_by :selenium, using: "headless_#{browser}".to_sym
    end
  end

  if ENV["LOG_JS_ERRORS"]
    config.after(type: :system) do
      puts page.driver.browser.manage.logs.get(:browser)
    end
  end
end
