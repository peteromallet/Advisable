# frozen_string_literal: true

require "open-uri"

class AttachCoverToArticleJob < ApplicationJob
  queue_as :case_studies

  def perform(article, force: false)
    article.cover_photo = nil if force
    return if article.cover_photo.attached?

    client = Aws::S3::Client.new
    objects = client.list_objects(bucket: ENV.fetch("CASE_STUDY_COVERS_BUCKET_NAME", nil))
    random_object = objects.contents.sample
    obj = Aws::S3::Object.new(bucket_name: ENV.fetch("CASE_STUDY_COVERS_BUCKET_NAME", nil), key: random_object.key)
    uri = URI.parse(obj.presigned_url(:get))
    article.cover_photo.attach(io: uri.open, filename: random_object.key)
    article.save!
  end
end
