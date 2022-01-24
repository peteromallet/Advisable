# frozen_string_literal: true

Rails.application.config.session_store(:cookie_store, key: "_advisable_app_session", secure: true, same_site: :strict)
