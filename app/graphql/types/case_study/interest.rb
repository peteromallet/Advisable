# frozen_string_literal: true

module Types
  module CaseStudy
    class Interest < Types::BaseType
      def self.authorized?(interest, context)
        policy = ::CaseStudy::InterestPolicy.new(context[:current_user], interest)
        ApiError.not_authorized("You do not have permission to view this Interest") unless policy.read?
        super
      end

      graphql_name "CaseStudyInterest"
      description "Type definition for CaseStudy::Interest"

      field :id, ID, null: false, method: :uid
      field :term, String, null: false
      field :articles, Article.connection_type, null: true
      def articles
        object.articles.for_feed
      end
    end
  end
end
