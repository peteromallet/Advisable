class Search < ApplicationRecord
  include Uid

  belongs_to :user
  belongs_to :recommended_project,
             class_name: 'OffPlatformProject', required: false

  def results
    @results ||=
      begin
        records =
          (
            search_by_skills + search_by_projects +
              search_by_off_platform_projects
          )
        records.sort_by { |s| s.average_score || 0 }.reverse
      end
  end

  def create_recommendation
    Search::Recommendations.new(self).create_recommendation
  end

  private

  def base_search
    @base_search ||=
      begin
        query =
          Specialist.where('average_score >= ?', 65.0).where.not(
            hourly_rate: nil
          )
        query = filter_industry(query)
        query = filter_company_type(query)
        query
      end
  end

  def search_by_skills
    base_search.joins(:skills).where(skills: { name: skill })
  end

  def search_by_projects
    base_search.joins(projects: :skills).where(
      projects: { skills: { name: skill } }
    )
  end

  def search_by_off_platform_projects
    base_search.joins(off_platform_projects: :skills).where(
      off_platform_projects: { skills: { name: skill } }
    )
  end

  def filter_industry(query)
    return query unless industry_experience_required
    joined = query.left_outer_joins(:off_platform_projects, :projects)
    joined.where(off_platform_projects: { industry: industry }).or(
      joined.where(projects: { industry: industry })
    )
  end

  def filter_company_type(query)
    return query unless company_experience_required
    joined = query.left_outer_joins(:off_platform_projects, :projects)
    joined.where(off_platform_projects: { company_type: company_type }).or(
      joined.where(projects: { company_type: company_type })
    )
  end
end
