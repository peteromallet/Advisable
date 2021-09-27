# frozen_string_literal: true

require "barnes"

nakayoshi_fork

workers Integer(ENV["WEB_CONCURRENCY"] || 2)
threads_count = Integer(ENV["RAILS_MAX_THREADS"] || 5)
threads threads_count, threads_count

preload_app!

rackup      DefaultRackup
port        ENV["PORT"]     || 3000
environment ENV["RACK_ENV"] || "development"

if ENV["RAILS_ENV"] == "development"
  worker_timeout 99999999 # It's over 9000!
end

before_fork do
  require "puma_worker_killer"
  PumaWorkerKiller.enable_rolling_restart # Default is every 6 hours

  # worker specific setup
  Barnes.start # Must have enabled worker mode for this to block to be called
end

# Specifies the `pidfile` that Puma will use.
pidfile ENV.fetch("PIDFILE", "tmp/pids/server.pid")

# Allow puma to be restarted by `rails restart` command.
plugin :tmp_restart
