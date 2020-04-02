class Search < ApplicationRecord
  include Uid

  belongs_to :user
  belongs_to :recommended_project,
             class_name: 'PreviousProject', required: false

  has_many :consultations

  def results
    @results ||=
      begin
        records = (search_by_skills + search_by_previous_projects).uniq
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

  def search_by_previous_projects
    base_search.joins(previous_projects: :skills).where(
      previous_projects: { skills: { name: skill } }
    )
  end

  def filter_industry(query)
    return query unless industry_experience_required
    joined = query.left_outer_joins(previous_projects: :industries)

    joined.where(previous_projects: { industries: { name: industry } })
  end

  def filter_company_type(query)
    return query unless company_experience_required
    joined = query.left_outer_joins(:previous_projects)
    joined.where(previous_projects: { company_type: company_type })
  end
end
