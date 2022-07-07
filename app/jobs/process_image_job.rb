# frozen_string_literal: true

class ProcessImageJob < ApplicationJob
  def perform(blob, options)
    blob.variant(options).process
  rescue ActiveStorage::FileNotFoundError
    blob.attachments.each(&:purge)
  end
end
