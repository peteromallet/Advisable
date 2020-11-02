require 'open-uri'

class SetUserImageJob < ApplicationJob
  queue_as :default

  def perform(id, url)
    user = User.find(id)
    return if url.blank? || user.blank?

    filename = File.basename(URI.parse(url).path)
    file = open(url)
    user.avatar.attach(io: file, filename: filename)
  rescue URI::BadURIError, URI::InvalidURIError => e
    Raven.capture_exception(e, level: "warning")
  end
end
