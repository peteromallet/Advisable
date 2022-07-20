# frozen_string_literal: true

module Types
  module CaseStudy
    class Topic < Types::BaseType
      graphql_name "CaseStudyTopic"
      description "Type definition for CaseStudy::Topic"

      field :id, ID, null: false, method: :uid
      field :slug, String, null: false
      field :name, String, null: true
      field :description, String, null: true

      field :icon, String, null: true
      def icon
        # get url here
      end

      field :articles, Article.connection_type, null: true
      def articles
        ::CaseStudy::Article.where(id: object.results).for_feed
      end
    end
  end
end
