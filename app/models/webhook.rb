# frozen_string_literal: true

# Represents an instance of a webhook
class Webhook < ApplicationRecord
  serialize :response, Hash
  after_initialize :set_pending, if: :new_record?
  after_commit :perform, on: :create

  # Creates a sidekiq WebhookJob to process the webhook. This is automatically
  # called after the record is inserted into the database using an after_commit
  # callback.
  def perform
    WebhookJob.perform_later(id)
  end

  private

  # Sets the default status for the webhook.
  def set_pending
    self.status = "pending"
  end
end

# == Schema Information
#
# Table name: webhooks
#
#  id         :bigint           not null, primary key
#  data       :jsonb
#  response   :text
#  status     :string
#  url        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
