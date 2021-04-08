# frozen_string_literal: true

module Types
  module RecommendationInterface
    include Types::BaseInterface
    field_class BaseField

    orphan_types Types::IndustryRecommendation, Types::SkillRecommendation, Types::RandomRecommendation

    description "Represents an interface for a specialist recommendation"

    field :recommendation, Types::SpecialistType, null: false

    definition_methods do
      def resolve_type(object, _context)
        case object.class.name
        when "Specialists::Recommenders::IndustriesRecommendation" then Types::IndustryRecommendation
        when "Specialists::Recommenders::SkillsRecommendation" then Types::SkillRecommendation
        when "Specialists::Recommenders::RandomRecommendation" then Types::RandomRecommendation
        end
      end
    end
  end
end
