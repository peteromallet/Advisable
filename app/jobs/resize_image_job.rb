# frozen_string_literal: true

class ResizeImageJob < ApplicationJob
  queue_as :default

  def perform(object, attachment_name, **options)
    object.public_send(attachment_name).variant(options).processed
  end
end
