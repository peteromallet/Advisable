# frozen_string_literal: true

class PreviousProjectPolicy < BasePolicy
  def delete?
    owner? || admin?
  end
  alias publish? delete?

  private

  def owner?
    record.specialist == user
  end
end
