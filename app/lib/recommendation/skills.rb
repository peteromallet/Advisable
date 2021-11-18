# frozen_string_literal: true

module Recommendation
  class Skills < Base
    def self.for(specialist, others)
      skills = specialist.skills
      recommendation = others.left_joins(:skills).
        group(:id).
        where(specialist_skills: {skill_id: skills}).
        having("COUNT(DISTINCT(skills.id) > 1").
        order("RANDOM()")&.first

      new(specialist, recommendation)
    end

    def skills
      return unless recommendation

      Skill.find_by_sql("#{specialist.skills.to_sql} INTERSECT #{recommendation.skills.to_sql} LIMIT 3")
    end
  end
end
