class BookingPolicy < BasePolicy
  def is_specialist_or_client
    return true if record.application.specialist == user
    return true if record.application.project.user == user
  end

  def is_client
    return true if record.application.project.user == user
  end
end