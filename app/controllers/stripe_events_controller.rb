class StripeEventsController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def create
    begin
      StripeEvents.process(stripe_event)
      head :no_content, status: 200
    rescue Stripe::SignatureVerificationError => e
      render json: { error: "Invalid signature" }, status: 400
    rescue JSON::ParserError => e
      render json: { error: "Invalid JSON" }, status: 400
    end
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