# frozen_string_literal: true

module Subscriptions
  class FeedUpdated < Subscriptions::BaseSubscription
    subscription_scope :current_account_id
    field :ok, Boolean, null: false

    def subscribe
      :no_response
    end

    def update
      {ok: true}
    end
  end
end
