RSpec.configure do |config|
  config.before(:each, type: :system) do
    Capybara.register_driver :chrome do |app|
      options = Selenium::WebDriver::Chrome::Options.new(args: [
        "--window-size=1280,900",
        "--headless"
      ])

      Capybara::Selenium::Driver.new(app,
        browser: :chrome,
        options: options,
      )
    end

    
    driven_by :selenium_chrome_headless
    # driven_by :selenium_chrome
    # driven_by :chrome
  end
end
