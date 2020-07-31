require 'open-uri'

class SetRemoteAttachment < ApplicationJob
  queue_as :default

  def perform(object, attribute, url)
    filename = File.basename(URI.parse(url).path)
    file = open(url)
    object.send(attribute).attach(io: file, filename: filename)
  end
end
