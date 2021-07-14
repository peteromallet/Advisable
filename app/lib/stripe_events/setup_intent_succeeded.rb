# frozen_string_literal: true

# Handler for the stripe setup_intent.succeeded webhook event. This fires when
# a user has completed the setup flow for adding a card. We do two things
# inside this class. We attach the payment method to the customer object by
# calling UpdateCompanysPaymentMethod. Then we update the users
# 'setup_intent_status' is set to 'succeeded' to indicate that the setup process
# has been complete. During the flow for adding a card we poll the API until the
# users setup_intent_status changes from pending to succeeded.
module StripeEvents
  class SetupIntentSucceeded < StripeEvents::BaseEvent
    def process
      # If the record wasn't found then just return true
      return true if company.nil?

      UpdateCompanysPaymentMethodJob.perform_later(company, setup_intent.payment_method)

      # Update the setup_intent_status so the frontend can respond
      company.update_columns(setup_intent_status: "succeeded") # rubocop:disable Rails/SkipsModelValidations
    end

    private

    def setup_intent
      event.data.object
    end

    def company
      @company ||= Company.find_by(stripe_setup_intent_id: setup_intent.id)
    end
  end
end
