require 'rails_helper'

describe StripeEventsController do
  it 'calls StripeEvents.process' do
    event = double(Stripe::Event)
    allow(Stripe::Webhook).to receive(:construct_event).and_return(event)
    expect(StripeEvents).to receive(:process).with(event)
    post :create, :params => PAYMENT_INTENT_EVENT, :format => :json
    expect(response.status).to eq(204)
  end

  it 'returns 400 if invalid JSON is passed' do
    allow(Stripe::Webhook).to receive(:construct_event).and_raise(JSON::ParserError)
    post :create, :params => PAYMENT_INTENT_EVENT, :format => :json
    expect(response.status).to eq(400)
  end

  it 'returns 400 if invalid signature' do
    error = Stripe::SignatureVerificationError.new("invalid", "signature_header")
    allow(Stripe::Webhook).to receive(:construct_event).and_raise(error)
    post :create, :params => PAYMENT_INTENT_EVENT, :format => :json
    expect(response.status).to eq(400)
  end
end

PAYMENT_INTENT_EVENT = {
  "created": 1326853478,
  "livemode": false,
  "id": "evt_00000000000000",
  "type": "payment_intent.succeeded",
  "object": "event",
  "request": nil,
  "pending_webhooks": 1,
  "api_version": "2019-05-16",
  "data": {
    "object": {
      "id": "pi_00000000000000",
      "object": "payment_intent",
      "amount": 50000,
      "amount_capturable": 0,
      "amount_received": 0,
      "application": nil,
      "application_fee_amount": nil,
      "canceled_at": nil,
      "cancellation_reason": nil,
      "capture_method": "automatic",
      "charges": {
        "object": "list",
        "data": [],
        "has_more": false,
        "total_count": 0,
        "url": "/v1/charges?payment_intent=pi_1EsW3oAs6WKG5Dhf4zdQkIoi"
      },
      "client_secret": "pi_1EsW3oAs6WKG5Dhf4zdQkIoi_secret_PWkrgcg7Lx6YVfBMig47sRvNo",
      "confirmation_method": "automatic",
      "created": 1562251040,
      "currency": "usd",
      "customer": "cus_00000000000000",
      "description": nil,
      "invoice": nil,
      "last_payment_error": nil,
      "livemode": false,
      "metadata": {
        "payment_type": "deposit",
        "project": "pro_jPjV2vtaQKxaRcI"
      },
      "next_action": nil,
      "on_behalf_of": nil,
      "payment_method": nil,
      "payment_method_options": {
      },
      "payment_method_types": [
        "card"
      ],
      "receipt_email": nil,
      "review": nil,
      "setup_future_usage": "off_session",
      "shipping": nil,
      "source": nil,
      "statement_descriptor": nil,
      "status": "requires_payment_method",
      "transfer_data": nil,
      "transfer_group": nil
    }
  }
}