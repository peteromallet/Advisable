# frozen_string_literal: true

module Types
  module CaseStudy
    class InterestPreview < Types::BaseType
      def self.authorized?(interest_preview, context)
        policy = ::CaseStudy::InterestPreviewPolicy.new(context[:current_user], interest_preview)
        ApiError.not_authorized("You do not have permission to view this Interest Preview") unless policy.read?
        super
      end

      graphql_name "CaseStudyInterestPreview"
      description "Type definition for CaseStudy::InterestPreview"

      field :id, ID, null: false, method: :uid
      field :term, String, null: false
      field :articles, Article.connection_type, null: true
      def articles
        ::CaseStudy::Article.where(id: object.results).for_feed
      end
    end
  end
end
