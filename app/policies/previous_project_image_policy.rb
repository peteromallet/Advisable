# frozen_string_literal: true

class PreviousProjectImagePolicy < BasePolicy
  def update?
    owner? || admin?
  end

  private

  def owner?
    record.previous_project.specialist == user
  end
end
