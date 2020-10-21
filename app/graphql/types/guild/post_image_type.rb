class Types::Guild::PostImageType < Types::BaseType
  graphql_name 'GuildPostImage'

  field :id, ID, null: false
  field :url, String, null: false
  field :cover, Boolean, null: false
  field :position, Integer, null: false

  def id
    object.uid
  end

  def cover
    object.cover || false
  end

  def url
    Rails.application.routes.url_helpers.rails_blob_url(
      object.image,
      host: ENV['ORIGIN'] || "https://#{ENV['HEROKU_APP_NAME']}.herokuapp.com"
    )
  end
end
