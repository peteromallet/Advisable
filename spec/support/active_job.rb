require 'active_job'

# put sidekiq in test mode
# require 'sidekiq/testing'
# Sidekiq::Testing.fake!

ActiveJob::Base.queue_adapter = :test
::Rails.application.config.active_job.adapter = :test

RSpec.configure do |config|
  config.include ActiveJob::TestHelper
end
