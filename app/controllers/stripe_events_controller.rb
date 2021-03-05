# frozen_string_literal: true

class StripeEventsController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def create
    StripeEvents.process(stripe_event)
    head :no_content, status: 200
  rescue Stripe::SignatureVerificationError => e
    Sentry.capture_exception(e)
    render json: {error: "Invalid signature"}, status: :bad_request
  rescue JSON::ParserError => e
    Sentry.capture_exception(e)
    render json: {error: "Invalid JSON"}, status: :bad_request
  end

  private

  def stripe_event
    Stripe::Webhook.construct_event(
      request.body.read,
      request.env["HTTP_STRIPE_SIGNATURE"],
      ENV["STRIPE_WEBHOOK_SECRET"]
    )
  end
end
