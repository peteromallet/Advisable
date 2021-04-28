# frozen_string_literal: true

module Types
  module CaseStudy
    class Image < Types::BaseType
      ASSET_HOST = ENV['ORIGIN'] || "https://#{ENV['HEROKU_APP_NAME']}.herokuapp.com"

      description "Represents a case study image"
      graphql_name "CaseStudyImage"

      field :id, ID, null: false
      field :signed_id, String, null: false

      field :url, String, null: true
      def url
        Rails.application.routes.url_helpers.rails_blob_url(object, host: ASSET_HOST)
      end
    end
  end
end
