# frozen_string_literal: true

module Types
  module CaseStudy
    class CompanyType < Types::BaseType
      graphql_name "CaseStudyCompany"
      description "Type definition for CaseStudy::Company"

      field :id, ID, null: false
      field :name, String, null: false
      field :website, String, null: false
      field :logo, String, null: true, method: :resized_logo_url
      field :business_type, String, null: true
      field :description, String, null: true
      field :articles, [ArticleType], null: true
    end
  end
end
