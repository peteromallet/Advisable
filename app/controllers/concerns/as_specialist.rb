# frozen_string_literal: true

module AsSpecialist
  private

  def admin_or_as_specialist?
    current_account&.specialist&.id == article.specialist_id || admin?
  end
end
