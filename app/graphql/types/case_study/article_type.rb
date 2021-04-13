# frozen_string_literal: true

module Types
  module CaseStudy
    class ArticleType < Types::BaseType
      graphql_name "CaseStudyArticle"
      description "Type definition for CaseStudy::Article"

      field :id, ID, null: false
      field :company, CompanyType, null: true
      field :skills, [SkillType], null: true
      field :industries, [IndustryType], null: true
      field :sections, [SectionType], null: true
      field :title, String, null: true
      field :subtitle, String, null: true
      field :excerpt, String, null: true
      field :comment, String, null: true
      field :company_type, String, null: true
      field :score, Int, null: true
      field :confidential, Boolean, null: true
      field :goals, GraphQL::Types::JSON, null: true
      field :published_at, GraphQL::Types::ISO8601DateTime, null: true
      field :specialist_approved_at, GraphQL::Types::ISO8601DateTime, null: true
    end
  end
end
