# frozen_string_literal: true

module Types
  module CaseStudy
    class Company < Types::BaseType
      graphql_name "CaseStudyCompany"
      description "Type definition for CaseStudy::Company"

      field :id, ID, null: false, method: :uid
      field :name, String, null: false
      field :website, String, null: true
      field :business_type, String, null: true
      field :description, String, null: true
      field :articles, [Article], null: false

      field :favicon, String, null: true
      def favicon
        Rails.cache.fetch("cs_company_favicon_#{object.id}", expires_in: 1.day) { object.favicon.url || clearbit_logo }
      end

      private

      def clearbit_logo
        return nil if object.website.blank?

        "//logo.clearbit.com/#{object.website}"
      end
    end
  end
end
