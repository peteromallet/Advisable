# frozen_string_literal: true

module Specialists
  class Recommender < ApplicationService
    CATEGORIES = %w[skill industry random].freeze
    attr_accessor :specialist, :recommendation, :category, :recommendation_tokens

    def initialize(specialist:)
      super()
      @specialist = specialist
    end

    # Cycles through the recommendation categories until there is a match
    def call
      attempts = []
      CATEGORIES.size.times do
        @category = (CATEGORIES - attempts).sample
        @recommendation = recommend_specialist!
        @recommendation_tokens = generate_tokens!
        return self if category && recommendation

        attempts << category
      end
      raise Service::Error, "Could not recommend a specialist with category: #{category}"
    end

    private

    def others
      @others ||= Specialist.guild.where.not(id: specialist.id)
    end

    def generate_tokens!
      return unless category && recommendation

      matchables = case category
                   when "industry"
                     specialist.previous_project_industries.merge(recommendation.previous_project_industries).limit(3)
                   when "skill"
                     Skill.find_by_sql("
                      (#{specialist.skills.to_sql} UNION #{specialist.previous_project_skills.to_sql})
                      INTERSECT
                      (#{recommendation.skills.to_sql} UNION #{recommendation.previous_project_skills.to_sql})
                      LIMIT 3")
                   end
      matchables&.pluck(:name)
    end

    def recommend_specialist!
      specialists = case category
                    when "skill"
                      skills = specialist.previous_project_skills | specialist.skills
                      others.left_joins(:skills, previous_projects: :project_skills).
                        group(:id).
                        where(["project_skills.skill_id IN (?) OR specialist_skills.skill_id IN (?)", skills, skills]).
                        having("COUNT(DISTINCT(skills.id, project_skills.skill_id)) > 1")
                    when "industry"
                      industries = specialist.previous_project_industries
                      others.left_joins(:previous_project_industries).
                        group(:id).
                        where(project_industries: {industry_id: industries})
                    when "random"
                      others
                    end
      specialists&.order(Arel.sql("RANDOM()"))&.first
    end
  end
end
