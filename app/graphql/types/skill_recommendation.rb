# frozen_string_literal: true

module Types
  class SkillRecommendation < Types::BaseType
    description "Represents fields for a skills recommendation"
    implements Types::RecommendationInterface

    field :skills, [Types::Skill], null: true
  end
end
