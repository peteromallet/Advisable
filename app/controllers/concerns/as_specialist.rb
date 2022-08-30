# frozen_string_literal: true

module AsSpecialist
  private

  def admin_or_as_specialist?
    @as_specialist = article.published_at.nil? && current_account&.specialist&.id == article.specialist_id
    @as_specialist || admin?
  end
end
