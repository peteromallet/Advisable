class ApplicationPolicy < BasePolicy
  def is_specialist_or_client
    return true if record.specialist == user
    return true if record.project.user == user
  end

  def is_client
    return true if record.project.user == user
  end

  def is_specialist
    return true if record.specialist == user
  end
end