# frozen_string_literal: true

require "open-uri"

class AttachImageJob < ApplicationJob
  queue_as :default

  def perform(object, url)
    return if object.blank? || url.blank?

    uri = URI.parse(url)
    filename = File.basename(uri.path)
    file = uri.open

    case object
    when SalesPerson
      object.image.attach(io: file, filename:)
    when Review
      object.avatar.attach(io: file, filename:)
    else
      Sentry.capture_message("Don't know what to do with #{object.class.name}")
    end
  rescue URI::BadURIError, URI::InvalidURIError => e
    Sentry.capture_exception(e, level: "warning")
  end
end
