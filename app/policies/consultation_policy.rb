# frozen_string_literal: true

class ConsultationPolicy < BasePolicy
  def accept?
    owner? || admin?
  end

  def owner?
    record.specialist == user
  end
end
