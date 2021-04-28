# frozen_string_literal: true

module Types
  module CaseStudy
    class ResultsContent < Types::BaseType
      graphql_name "Results"
      description "Type definition for CaseStudy::ResultsContent"
      implements Types::CaseStudy::ContentInterface

      field :results, [String], null: true
      def results
        object.content["results"]&.reject(&:nil?)
      end
    end
  end
end
