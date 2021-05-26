# frozen_string_literal: true

class ResizeImageJob < ApplicationJob
  queue_as :default

  def perform(attachment, **options)
    attachment.variant(options).processed
  rescue MiniMagick::Error => e
    Sentry.capture_exception(e, level: 'debug', extra: {attachment_id: attachment.id, record_type: attachment.record_type, record_id: attachment.record_id})
  end
end
