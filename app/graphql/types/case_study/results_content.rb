# frozen_string_literal: true

module Types
  module CaseStudy
    class ResultsContent < Types::BaseType
      graphql_name "Results"
      description "Type definition for CaseStudy::ResultsContent"
      implements Types::CaseStudy::ContentInterface

      field :results, [GraphQL::Types::JSON], null: true
      def results
        (object.content["results"] || []).select(&:present?)
      end
    end
  end
end
