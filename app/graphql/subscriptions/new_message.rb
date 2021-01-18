# frozen_string_literal: true

class Subscriptions::NewMessage < Subscriptions::BaseSubscription
  field :message, Types::MessageType, null: true
  subscription_scope :current_account_uid

  def subscribe
    {message: nil}
  end

  def update
    {message: object}
  end
end
