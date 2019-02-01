RSpec.configure do |config|
  config.before(:each, type: :system) do
    Capybara.register_driver :chrome_with_logs do |app|
      Capybara::Selenium::Driver.new(app,
        browser: :chrome,
        driver_opts: {
          log_path: './tmp/chrome.log',
          verbose:  true
        }
      )
    end
    driven_by :selenium_chrome_headless
    # driven_by :selenium_chrome
    # driven_by :chrome_with_logs
  end
end
