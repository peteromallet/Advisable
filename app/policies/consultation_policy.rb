# frozen_string_literal: true

class ConsultationPolicy < BasePolicy
  def read?
    specialist_owner? || user_owner? || admin?
  end

  def accept?
    specialist_owner? || admin?
  end
  alias decline? accept?

  def update?
    user_owner? || admin?
  end
  alias send_request? update?
end
