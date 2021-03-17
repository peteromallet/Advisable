# frozen_string_literal: true

class PreviousProjectImagePolicy < BasePolicy
  def update?
    owner? || admin?
  end
  alias delete? update?

  private

  def owner?
    record.previous_project.specialist == user
  end
end
