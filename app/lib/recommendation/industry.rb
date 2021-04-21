# frozen_string_literal: true

module Recommendation
  class Industry < Base
    def self.for(specialist, others)
      industries = specialist.previous_project_industries
      recommendation = others.left_joins(:previous_project_industries).
        group(:id).
        where(project_industries: {industry_id: industries}).
        order("RANDOM()")&.first

      new(specialist, recommendation)
    end

    def industries
      return unless recommendation

      specialist.previous_project_industries.merge(recommendation.previous_project_industries).limit(3)
    end
  end
end
