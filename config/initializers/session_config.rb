unless ENV['STAGING'] == 'true'
  Rails.application.config.session_store :cookie_store,
                                         key: '_advisable_session', domain: :all
end
