# frozen_string_literal: true

# Do *not* add `same_site: :strict`` since that causes CSRF with google oauth!
# Or, if you do, make sure google oauth still works when loggged in to Google with multiple accounts.
Rails.application.config.session_store(:cookie_store, key: "_advisable_app_session", secure: Rails.env.production?)
