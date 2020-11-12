web: bundle exec puma -C config/puma.rb
worker: bundle exec sidekiq -t 25 -C config/sidekiq.yml
release: bundle exec rails db:migrate
