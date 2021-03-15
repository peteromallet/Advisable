# frozen_string_literal: true

module Subscriber
  extend ActiveSupport::Concern

  included do
    has_many :subscriptions, dependent: :destroy
  end

  def subscribe_to!(tag)
    return if subscribed_to?(tag)

    subscriptions.create!(tag: tag)
    subscriptions.create!(label: tag.label_mirror)
  end

  def subscribed_to?(tag)
    subscriptions.exists?(tag: tag)
  end

  def unsubscribe_from!(tag)
    return unless subscribed_to?(tag)

    subscriptions.find_by(tag: tag).destroy!
    subscriptions.find_by!(label: tag.label_mirror).destroy!
  end
end
