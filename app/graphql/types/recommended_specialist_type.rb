# frozen_string_literal: true

module Types
  class RecommendedSpecialistType < Types::BaseType
    description "Represents a recommender object for recommended specialists"
    field :category, String, null: false
    field :recommendation, Types::SpecialistType, null: false
    field :recommendation_tokens, [String], null: true
  end
end
