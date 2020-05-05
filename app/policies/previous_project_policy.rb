class PreviousProjectPolicy < BasePolicy
  def is_specialist
    return true if record.specialist == user
  end
end
