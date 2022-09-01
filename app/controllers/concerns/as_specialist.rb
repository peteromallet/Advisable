# frozen_string_literal: true

module AsSpecialist
  private

  def admin_or_as_specialist?
    @as_specialist = current_account&.specialist&.id == article.specialist_id
    @as_specialist || admin?
  end
end
