# frozen_string_literal: true

module Subscriber
  extend ActiveSupport::Concern

  included do
    has_many :subscriptions, dependent: :destroy
    has_many :guild_subscribed_topics, through: :subscriptions, source: :tag
    has_many :subscribed_labels, through: :subscriptions, source: :label
  end

  # TODO: AATO - Clean up tag_or_label

  def subscribed_to?(tag_or_label)
    if tag_or_label.is_a?(Label)
      subscriptions.exists?(label: tag_or_label)
    else
      subscriptions.exists?(tag: tag_or_label)
    end
  end

  def subscribe_to!(tag_or_label)
    return if subscribed_to?(tag_or_label)

    if tag_or_label.is_a?(Label)
      subscriptions.create!(label: tag_or_label)
    else
      subscriptions.create!(tag: tag_or_label)
      subscriptions.create!(label: tag_or_label.label_mirror)
    end
  end

  def unsubscribe_from!(tag_or_label)
    return unless subscribed_to?(tag_or_label)

    if tag_or_label.is_a?(Label)
      subscriptions.find_by(label: tag_or_label).destroy!
    else
      subscriptions.find_by(tag: tag_or_label).destroy!
      subscriptions.find_by!(label: tag_or_label.label_mirror).destroy!
    end
  end
end
