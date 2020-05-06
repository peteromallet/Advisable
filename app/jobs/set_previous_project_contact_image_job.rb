require 'open-uri'

class SetPreviousProjectContactImageJob < ApplicationJob
  queue_as :default

  def perform(id, url)
    project = PreviousProject.find(id)
    filename = File.basename(URI.parse(url).path)
    file = open(url)
    project.contact_image.attach(io: file, filename: filename)
  end
end
