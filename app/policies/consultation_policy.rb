# frozen_string_literal: true

class ConsultationPolicy < BasePolicy
  def accept?
    specialist_owner? || admin?
  end
  alias decline? accept?

  def update?
    user_owner? || admin?
  end

  private

  def specialist_owner?
    record.specialist == user
  end

  def user_owner?
    record.user == current_user
  end
end
