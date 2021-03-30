# frozen_string_literal: true

class ConsultationPolicy < BasePolicy
  def accept?
    specialist_owner? || admin?
  end
  alias decline? accept?

  def update?
    user_owner? || admin?
  end
  alias send_request? update?

  private

  def specialist_owner?
    record.specialist == current_user
  end

  def user_owner?
    record.user == current_user
  end
end
