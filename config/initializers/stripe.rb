# frozen_string_literal: true

Stripe.api_key = ENV.fetch("STRIPE_SECRET_KEY", nil)
Stripe.api_version = "2019-12-03"
