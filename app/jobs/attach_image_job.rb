require 'open-uri'

class AttachImageJob < ApplicationJob
  queue_as :default

  def perform(object, url)
    return if object.blank? || url.blank?

    uri = URI.parse(url)
    filename = File.basename(uri.path)
    file = uri.open

    case object
    when PreviousProject
      object.contact_image.attach(io: file, filename: filename)
    when SalesPerson
      object.image.attach(io: file, filename: filename)
    when User
      object.avatar.attach(io: file, filename: filename)
    else
      Raven.capture_message("Don't know what to do with #{object.class.name}")
    end
  rescue URI::BadURIError, URI::InvalidURIError => e
    Raven.capture_exception(e, level: "warning")
  end
end
