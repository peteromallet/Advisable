# Calculates the average ratings for a specialist from their reviews.
class Specialists::Search < ApplicationService
  attr_accessor :skill, :industry

  def initialize(skill:, industry:)
    @skill = skill
    @industry = industry
  end

  def call
    specialists = (by_skills + by_projects + by_off_platform_projects).uniq
    specialists.sort_by { |s| s.average_score || 0 }.reverse
  end

  private

  def by_skills
    query = Specialist.joins(:skills).where(skills: { name: skill })
    query = filter_industry(query)
    query
  end

  def by_projects
    query = Specialist.joins(projects: :skills).where(projects: { skills: { name: skill }})
    query = filter_industry(query)
    query
  end

  def by_off_platform_projects
    query = Specialist.joins(off_platform_projects: :skills).where(off_platform_projects: { skills: { name: skill }})
    query = filter_industry(query)
    query
  end

  def filter_industry(query)
    return query if industry.nil?
    joined = query.left_outer_joins(:off_platform_projects, :projects)
    joined.where(off_platform_projects: { industry: industry }).or(
      joined.where(projects: { industry: industry })
    )
  end
end