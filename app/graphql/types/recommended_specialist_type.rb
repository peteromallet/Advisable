# frozen_string_literal: true

module Types
  class RecommendedSpecialistType < Types::BaseType
    field :id, ID, null: false
    field :match_category, String, null: false
    field :recommendation, Types::SpecialistType, null: false
    field :match_tokens, [String], null: true
  end
end
