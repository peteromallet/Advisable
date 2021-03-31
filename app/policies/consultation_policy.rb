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
end
