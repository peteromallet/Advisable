# frozen_string_literal: true

class ConsultationPolicy < BasePolicy
  def accept?
    owner? || admin?
  end
  alias decline? accept?

  private

  def owner?
    record.specialist == user
  end
end
