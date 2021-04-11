# frozen_string_literal: true

module Specialists
  module Recommenders
    class SkillsRecommendation < Recommendation
      def self.recommendation_for(specialist, others)
        skills = specialist.previous_project_skills | specialist.skills
        recommendation = others.left_joins(:skills, previous_projects: :project_skills).
          group(:id).
          where(["project_skills.skill_id IN (?) OR specialist_skills.skill_id IN (?)", skills, skills]).
          having("COUNT(DISTINCT(skills.id, project_skills.skill_id)) > 1").
          order(Arel.sql("RANDOM()"))&.first

        new(specialist, recommendation)
      end

      def skills
        return unless recommendation

        Skill.find_by_sql("
      (#{specialist.skills.to_sql} UNION #{specialist.previous_project_skills.to_sql})
      INTERSECT
      (#{recommendation.skills.to_sql} UNION #{recommendation.previous_project_skills.to_sql})
      LIMIT 3")
      end
    end
  end
end
