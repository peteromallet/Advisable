# frozen_string_literal: true

module Types
  class IndustryRecommendation < Types::BaseType
    description "Represents fields for an industry recommendation"
    implements Types::RecommendationInterface

    field :industries, [Types::IndustryType], null: true
  end
end
