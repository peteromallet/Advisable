require 'open-uri'

class SetReviewerImageJob < ApplicationJob
  queue_as :default

  def perform(id, url)
    review = Review.find(id)
    filename = File.basename(URI.parse(url).path)
    file = open(url)
    review.reviewer_image.attach(io: file, filename: filename)
  end
end
