# frozen_string_literal: true

module Types
  module CaseStudy
    class Article < Types::BaseType
      graphql_name "CaseStudyArticle"
      description "Type definition for CaseStudy::Article"

      field :id, ID, null: false, method: :uid
      field :specialist, Types::SpecialistType, null: true
      field :company, Company, null: true do
        authorize :read_company?
      end
      field :skills, [Skill], null: true
      field :industries, [Industry], null: true
      field :title, String, null: true
      field :subtitle, String, null: true
      field :excerpt, String, null: true
      field :comment, String, null: true
      field :company_type, [String], null: true
      field :score, Int, null: true
      field :confidential, Boolean, null: true
      field :goals, [String], null: true
      field :published_at, GraphQL::Types::ISO8601DateTime, null: true
      field :specialist_approved_at, GraphQL::Types::ISO8601DateTime, null: true

      field :sections, [Section], null: true
      def sections
        object.sections.by_position
      end

      field :is_saved, Boolean, null: false do
        argument :id, ID, required: true
      end
      def is_saved(id:)
        search = ::CaseStudy::Search.find_by!(uid: id)
        search.saved.include?(object.id)
      end

      field :is_archived, Boolean, null: false do
        argument :id, ID, required: true
      end
      def is_archived(id:)
        search = ::CaseStudy::Search.find_by!(uid: id)
        search.archived.include?(object.id)
      end

      field :shares, [SharedArticle], null: true
    end
  end
end
