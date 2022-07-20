# frozen_string_literal: true

module Types
  module CaseStudy
    class Insight < Types::BaseType
      graphql_name "CaseStudyInsight"
      description "Type definition for CaseStudy::Insight"

      field :id, ID, null: false, method: :uid
      field :title, String, null: true
      field :description, String, null: true
    end
  end
end
