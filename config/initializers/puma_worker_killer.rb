# frozen_string_literal: true
PumaWorkerKiller.config do |config|
  config.ram = 1024 # mb
  config.frequency = 30 # seconds
  config.percent_usage = 0.98
  config.rolling_restart_frequency = 12.hours
  config.reaper_status_logs = false
  config.pre_term = ->(worker) { Rails.logger.info("Worker #{worker.inspect} being killed") }
  config.rolling_pre_term = ->(worker) { Rails.logger.info("Worker #{worker.inspect} being killed by rolling restart") }
end
PumaWorkerKiller.start
