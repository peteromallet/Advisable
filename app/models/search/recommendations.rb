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

  def recommendation
    @recommendation ||=
      PreviousProject.joins(:skills, :specialist, :industries).where(
        'advisable_score >= 85 AND specialists.average_score >= 80 AND skills.name = ? AND industries.name = ?',
        [search.skill],
        [search.industry]
      ).order(advisable_score: :desc).first
  end
end
