# frozen_string_literal: true

class RecommendedSpecialistsJob < ApplicationJob
  def perform(specialist_id)
    @specialist = Specialist.find(specialist_id)
    categories = RecommendedSpecialist::MATCH_CATEGORIES

    attempts = []
    categories.size.times do
      match_category = (categories - attempts).sample
      recommendation = determine_recommendation(match_category)

      if recommendation && match_category
        match_tokens = determine_tokens(recommendation, match_category)
        return RecommendedSpecialist.create!(specialist: @specialist, recommendation: recommendation, match_category: match_category, match_tokens: match_tokens)
      end
      attempts << match_category
    end
    Raven.capture_message("No possible recommendation for specialist: #{@specialist.id}")
  end

  private

  def determine_tokens(recommendation, match_category)
    matchables = case match_category
                 when "industry"
                   @specialist.previous_project_industries.merge(recommendation.previous_project_industries).limit(3)
                 when "skill"
                   Skill.find_by_sql("
                    (#{@specialist.skills.to_sql} UNION #{@specialist.previous_project_skills.to_sql})
                    INTERSECT
                    (#{recommendation.skills.to_sql} UNION #{recommendation.previous_project_skills.to_sql})
                    LIMIT 3")
                 end
    matchables&.pluck(:name)
  end

  def determine_recommendation(match_category)
    previous = RecommendedSpecialist.where(specialist: @specialist).order(created_at: :desc).pluck(:recommendation_id)
    others = Specialist.guild.where.not(id: [@specialist.id, previous].flatten)

    recommendations = case match_category
                      when "skill"
                        skills = [@specialist.previous_project_skills, @specialist.skills].flatten.uniq
                        others.left_joins(:skills).group(:id).where(skills: skills.pluck(:id)).order('COUNT(skills.id) DESC')
                        # TODO: having("COUNT(skills.id) > 1")
                      when "industry"
                        industries = @specialist.previous_project_industries
                        others.left_joins(:previous_project_industries).
                          group(:id).
                          where(project_industries: {industry_id: industries}).
                          order('COUNT(industries.id) DESC')
                      when "random"
                        others
                      end
    recommendations&.first
  end
end
