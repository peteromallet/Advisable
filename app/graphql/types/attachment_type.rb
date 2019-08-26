class Types::AttachmentType < Types::BaseType
  field :url, String, null: true
  field :filename, String, null: true
  field :size, String, null: true

  def size
    object.byte_size
  end

  def url
    Rails.application.routes.url_helpers.rails_blob_url(object, host: ENV["ORIGIN"])
  end
end
