unless ENV['STAGING'] == 'true' || Rails.development?
  Rails.application.config.session_store :cookie_store, key: '_advisable_session', domain: '.advisable.com'
end
