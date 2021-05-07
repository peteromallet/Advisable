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
      field :skills, [Skill], null: true
      field :primary_skill, Skill, null: true
      def primary_skill
        object.skills.find_by(primary: true)
      end
      field :goals, [String], null: true
      field :saved, Article.connection_type, null: true
      field :archived, Article.connection_type, null: true
      field :results, Article.connection_type, null: true
    end
  end
end
