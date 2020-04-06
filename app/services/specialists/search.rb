class Specialists::Search < ApplicationService
  attr_accessor :skill,
                :industry,
                :company_type,
                :user,
                :industry_required,
                :company_type_required

  def initialize(
    skill:,
    industry:,
    company_type:,
    user:,
    industry_required:,
    company_type_required:
  )
    @skill = skill
    @industry = industry
    @company_type = company_type
    @industry_required = industry_required
    @company_type_required = company_type_required
    @user = user
  end

  def call
    update_user_info
    specialists = (by_skills + by_previous_projects).uniq
    specialists.sort_by { |s| s.average_score || 0 }.reverse
  end

  private

  # Update the users industry and company type based on their search
  def update_user_info
    return unless user.present? && user.is_a?(User)
    user.update(
      industry: Industry.find_by_name(industry), company_type: company_type
    )
    user.sync_to_airtable
  end

  def by_skills
    query =
      Specialist.joins(:skills).where('average_score >= ?', 65.0).where(
        skills: { name: skill }
      ).where.not(hourly_rate: nil)
    query = filter_industry(query)
    query = filter_company_type(query)
    query
  end

  def by_previous_projects
    query =
      Specialist.joins(previous_projects: :skills).where(
        'average_score >= ?',
        65.0
      ).where(previous_projects: { skills: { name: skill } }).where.not(
        hourly_rate: nil
      )
    query = filter_industry(query)
    query = filter_company_type(query)
    query
  end

  def filter_industry(query)
    return query unless industry_required
    joined = query.left_outer_joins(:previous_projects)
    joined.where(off_platform_projects: { industry: industry })
  end

  def filter_company_type(query)
    return query unless company_type_required
    joined = query.left_outer_joins(:previous_projects)
    joined.where(off_platform_projects: { company_type: company_type })
  end
end
