# Calculates the average ratings for a specialist from their reviews.
class Specialists::Search < ApplicationService
  attr_accessor :skill, :industry, :company_type

  def initialize(skill:, industry:, company_type:)
    @skill = skill
    @industry = industry
    @company_type = company_type
  end

  def call
    specialists = (by_skills + by_projects + by_off_platform_projects).uniq
    specialists.sort_by { |s| s.average_score || 0 }.reverse
  end

  private

  def by_skills
    query = Specialist.joins(:skills).where("average_score >= ?", 65.0).where(skills: { name: skill }).where.not(hourly_rate: nil)
    query = filter_industry(query)
    query = filter_company_type(query)
    query
  end

  def by_projects
    query = Specialist.joins(projects: :skills).where("average_score >= ?", 65.0).where(projects: { skills: { name: skill }}).where.not(hourly_rate: nil)
    query = filter_industry(query)
    query = filter_company_type(query)
    query
  end

  def by_off_platform_projects
    query = Specialist.joins(off_platform_projects: :skills).where("average_score >= ?", 65.0).where(off_platform_projects: { skills: { name: skill }}).where.not(hourly_rate: nil)
    query = filter_industry(query)
    query = filter_company_type(query)
    query
  end

  def filter_industry(query)
    return query if industry.nil?
    joined = query.left_outer_joins(:off_platform_projects, :projects)
    joined.where(off_platform_projects: { industry: industry }).or(
      joined.where(projects: { industry: industry })
    )
  end

  def filter_company_type(query)
    return query if company_type.nil?
    joined = query.left_outer_joins(:off_platform_projects, :projects)
    joined.where(off_platform_projects: { company_type: company_type }).or(
      joined.where(projects: { company_type: company_type })
    )
  end
end