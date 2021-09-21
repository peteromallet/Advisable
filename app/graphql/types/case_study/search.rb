# frozen_string_literal: true

module Types
  module CaseStudy
    class Search < Types::BaseType
      def self.authorized?(search, context)
        policy = ::CaseStudy::SearchPolicy.new(context[:current_user], search)
        ApiError.not_authorized("You do not have permission to view this Search") unless policy.read?
        super
      end

      graphql_name "CaseStudySearch"
      description "Type definition for CaseStudy::Search"

      field :id, ID, null: false, method: :uid
      field :name, String, null: false
      field :company_recomendation, Boolean, null: true
      field :skills, [Skill], null: true
      field :goals, [String], null: true
      field :results, Article.connection_type, null: true

      field :primary_skill, Skill, null: true
      def primary_skill
        object.skills.find_by(primary: true)
      end

      field :is_finalized, Boolean, null: false
      def is_finalized
        object.finalized_at.present?
      end

      field :preferences, [String], null: false
      def preferences
        object.preferences || []
      end

      field :archived, Article.connection_type, null: false
      def archived
        CaseStudy::Article.where(id: object.archived)
      end
    end
  end
end
