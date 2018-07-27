RSpec.configure do |config|
  config.before(:each, type: :system, js: true) do
    if ENV["SELENIUM_DRIVER_URL"].present?
      driven_by :selenium, using: :chrome,
                           options: {
                               browser: :remote,
                               url: ENV.fetch("SELENIUM_DRIVER_URL"),
                               desired_capabilities: :chrome}
    else
      driven_by :selenium, using: :chrome
    end
  end
end
