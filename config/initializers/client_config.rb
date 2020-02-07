# The client config is rendered inside of application.html.erb inside a script tag as a way
# to pass environment variables to the react app under the AdvisableConfig window object.
# We do this instead of using the webpack environment variables plugin to keep the app
# stateless and allow us to promote the app through the deploy pipeline without needing
# to recompile the assets.

CLIENT_CONFIG = {
  'ROLLBAR_ENV' => ENV['ROLLBAR_ENV'],
  'ROLLBAR_CLIENT_TOKEN' => ENV['ROLLBAR_CLIENT_TOKEN'],
  'STRIPE_PUBLIC_KEY' => ENV['STRIPE_PUBLIC_KEY'],
  'SENTRY_FRONTEND_DSN' => ENV['SENTRY_FRONTEND_DSN'],
  'SENTRY_ENVIRONMENT' => ENV['SENTRY_ENVIRONMENT'],
  'TALKJS' => ENV['TALKJS'],
  'INTERCOM_APP_ID' => ENV['INTERCOM_APP_ID']
}
