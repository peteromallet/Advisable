class Search::Recommendations
  attr_reader :search

  def initialize(search)
    @search = search
  end

  def create_recommendation
    return unless recommendation.present?
    search.update(recommended_project: recommendation)
    recommendation
  end

  private

  # TODO: At the moment the primary_skill column is a simple text column on
  # the off_platform_projects table. Eventually this should become a relationship
  # based on the project_skills record with primary = true. This query will need to
  # updated to accomodate that.
  def recommendation
    @recommendation ||=
      OffPlatformProject.joins(:specialist, :industries).where(
        'advisable_score >= 9 AND specialists.average_score >= 85 AND primary_skill = ? AND industries.name = ?',
        search.skill,
        search.industry
      )
        .order(advisable_score: :desc)
        .first
  end
end
