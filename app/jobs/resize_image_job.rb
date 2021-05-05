# frozen_string_literal: true

class ResizeImageJob < ApplicationJob
  queue_as :default

  def perform(attachment, **options)
    attachment.variant(options).processed
  rescue MiniMagick::Error => e
    Sentry.capture_exception(e, level: 'debug', extra: {object_class: object.class.name, object_id: object.id, name: attachment_name})
  end
end
