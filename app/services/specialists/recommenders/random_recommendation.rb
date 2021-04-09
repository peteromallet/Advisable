# frozen_string_literal: true

module Specialists
  module Recommenders
    class RandomRecommendation < Recommendation
      def self.recommendation_for(specialist, others)
        recommendation = others.order(Arel.sql("RANDOM()"))&.first
        new(specialist, recommendation) if recommendation.present?
      end
    end
  end
end
