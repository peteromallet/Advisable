# frozen_string_literal: true

class PreviousProjectPolicy < BasePolicy
  def delete?
    owner? || admin?
  end

  private

  def owner?
    record.specialist == user
  end
end
