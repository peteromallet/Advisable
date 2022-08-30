# frozen_string_literal: true

module Types
  module CaseStudy
    class PodcastContent < Types::BaseType
      graphql_name "Podcast"
      description "Type definition for CaseStudy::PodcastContent"
      implements Types::CaseStudy::ContentInterface

      field :url, String, null: true
      def url
        object.content["url"]
      end
    end
  end
end
