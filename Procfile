web: bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development}
worker: bundle exec sidekiq -t 25 -c 5 -e ${RACK_ENV:-development} -q default -q mailers
release: bundle exec rails db:migrate
