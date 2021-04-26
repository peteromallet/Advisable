# frozen_string_literal: true

module Types
  class RandomRecommendation < Types::BaseType
    description "Represents fields for a random recommendation"
    implements Types::RecommendationInterface

    field :skills, [Types::Skill], null: true
  end
end
