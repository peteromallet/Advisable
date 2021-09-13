# frozen_string_literal: true

class AttachCoverToArticleJob < ApplicationJob
  BUCKET_NAME = "case-study-covers"

  queue_as :default

  def perform(article, force: false)
    article.cover_photo = nil if force
    return if article.cover_photo.attached?

    client = Aws::S3::Client.new
    objects = client.list_objects(bucket: BUCKET_NAME)
    random_object = objects.contents.sample
    obj = Aws::S3::Object.new(bucket_name: BUCKET_NAME, key: random_object.key)

    uri = URI.parse(obj.presigned_url(:get))
    article.cover_photo.attach(io: uri.open, filename: random_object.key)
    article.save!
  end
end
