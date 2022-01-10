# frozen_string_literal: true

module Subscriber
  extend ActiveSupport::Concern

  included do
    has_many :subscriptions, dependent: :destroy
    has_many :subscribed_labels, through: :subscriptions, source: :label
  end

  def subscribed_to?(label)
    subscriptions.exists?(label:)
  end

  def subscribe_to!(label)
    return if subscribed_to?(label)

    subscriptions.create!(label:)
  end

  def unsubscribe_from!(label)
    return unless subscribed_to?(label)

    subscriptions.find_by(label:).destroy!
  end
end
