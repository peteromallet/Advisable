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

      # TODO: Remove these because they are only here for the purpose of duck typing with CaseStudy::Search. 👇
      field :name, String, null: false, method: :term
      field :skills, [Skill], null: true
      def skills
        []
      end
      field :goals, [String], null: true
      def goals
        []
      end

      field :results, Article.connection_type, null: true do
        argument :refresh_results, Boolean, required: false
      end
      def results(**_args)
        object.articles.for_feed
      end

      field :primary_skill, Skill, null: true
      def primary_skill
        nil
      end

      field :is_finalized, Boolean, null: false
      def is_finalized
        true
      end

      field :preferences, [String], null: false
      def preferences
        []
      end

      field :archived, Article.connection_type, null: false
      def archived
        []
      end
      # TODO: Remove these because they are only here for the purpose of duck typing with CaseStudy::Search. 👆
    end
  end
end
