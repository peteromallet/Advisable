# frozen_string_literal: true

module Specialists
  module Recommenders
    class IndustriesRecommendation < Recommendation
      def self.recommendation_for(specialist, others)
        industries = specialist.previous_project_industries
        recommendation = others.left_joins(:previous_project_industries).
          group(:id).
          where(project_industries: {industry_id: industries}).
          order(Arel.sql("RANDOM()"))&.first

        new(specialist, recommendation) if recommendation.present?
      end

      def industries
        return unless recommendation

        specialist.previous_project_industries.merge(recommendation.previous_project_industries).limit(3)
      end
    end
  end
end
