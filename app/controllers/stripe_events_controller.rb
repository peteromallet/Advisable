class StripeEventsController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def create
    StripeEvents.process(stripe_event)
    return head :no_content, status: 200
  end

  private

  def stripe_event
    begin
      Stripe::Webhook.construct_event(
        request.body.read,
        request.env["HTTP_STRIPE_SIGNATURE"],
        ENV["STRIPE_WEBHOOK_SECRET"]
      )
    rescue JSON::ParserError => e
      Rails.logger.info("Failed to process webhook: Invalid JSON")
      return head :no_content, status: 400
    rescue Stripe::SignatureVerificationError => e
      Rails.logger.info("Failed to process webhook: Invalid signature")
      return head :no_content, status: 400
    end
  end
end