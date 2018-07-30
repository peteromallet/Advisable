RSpec.configure do |config|
  config.before(:each, type: :system, js: true) do
    driven_by :selenium_chrome
  end
end
