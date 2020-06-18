FROM ruby:2.6.6-alpine

ARG bundle_without=development:test

RUN apk add --no-cache \
  # Bundler needs it to install forks and github sources.
  git \
  # Gems need the dev-headers/compilers.
  build-base \
  # PostgreSQL adapter needs the development headers.
  postgresql-dev #\
  # Add chromium and Node.js for system tests...
  # chromium chromium-chromedriver nodejs yarn

RUN mkdir /app
WORKDIR /app

COPY ./ ./
RUN gem update bundler
RUN bundle install --no-cache --without=$bundle_without

EXPOSE 3000

CMD bundle exec rails server -b 0.0.0.0
