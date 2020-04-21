class Types::PreviousProjectImage < Types::BaseType
  field :id, ID, null: false
  field :url, String, null: false
  field :cover, Boolean, null: false

  def id
    object.uid
  end

  def cover
    object.cover || false
  end

  def url
    Rails.application.routes.url_helpers.rails_blob_url(
      object.image,
      host: ENV['ORIGIN']
    )
  end
end
