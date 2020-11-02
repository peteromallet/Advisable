require 'open-uri'

class SetPreviousProjectContactImageJob < ApplicationJob
  queue_as :default

  def perform(id, url)
    project = PreviousProject.find(id)
    return if url.blank? || project.blank?

    filename = File.basename(URI.parse(url).path)
    file = open(url)
    project.contact_image.attach(io: file, filename: filename)
  rescue URI::BadURIError, URI::InvalidURIError => e
    Raven.capture_exception(e, level: "warning")
  end
end
