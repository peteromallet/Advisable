class Types::SalesPersonType < Types::BaseType
  field :id, ID, null: false
  field :first_name, String, null: false
  field :name, String, null: false
  field :image, String, null: true

  def image
    if object.image.attached?
      (
        Rails.application.routes.url_helpers.rails_blob_url(
          object.image,
          host:
            ENV['ORIGIN'] || "https://#{ENV['HEROKU_APP_NAME']}.herokuapp.com"
        )
      )
    end
  end
end
