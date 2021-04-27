# frozen_string_literal: true

module Recommendation
  class Random < Base
    def self.for(specialist, others)
      recommendation = others.order("RANDOM()")&.first
      new(specialist, recommendation)
    end

    def skills
      return unless recommendation&.previous_project_skills&.any?

      recommendation.previous_project_skills.
        group("skills.id").
        order("COUNT(skills.id) desc").
        limit(3)
    end
  end
end
