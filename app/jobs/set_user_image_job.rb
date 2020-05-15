require 'open-uri'

class SetUserImageJob < ApplicationJob
  queue_as :default

  def perform(id, url)
    user = User.find(id)
    filename = File.basename(URI.parse(url).path)
    file = open(url)
    user.avatar.attach(io: file, filename: filename)
  end
end
