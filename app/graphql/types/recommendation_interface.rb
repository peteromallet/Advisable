# frozen_string_literal: true

module Types
  module RecommendationInterface
    include Types::BaseInterface
    field_class BaseField

    orphan_types Types::IndustryRecommendation, Types::SkillsRecommendation, Types::RandomRecommendation

    description "Represents an interface for a specialist recommendation"

    field :recommendation, Types::SpecialistType, null: true

    definition_methods do
      def resolve_type(object, _context)
        "Types::#{object.class.name.demodulize}Recommendation".constantize
      end
    end
  end
end
