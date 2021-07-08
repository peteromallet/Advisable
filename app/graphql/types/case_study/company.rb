# frozen_string_literal: true

module Types
  module CaseStudy
    class Company < Types::BaseType
      graphql_name "CaseStudyCompany"
      description "Type definition for CaseStudy::Company"

      field :id, ID, null: false, method: :uid
      field :name, String, null: false
      field :website, String, null: false
      field :logo, String, null: true, method: :resized_logo_url
      field :business_type, String, null: true
      field :description, String, null: true
      field :articles, [Article], null: false
      
      field :favicon, String, null: true
      def favicon
        object.favicon.url
      end
    end
  end
end
