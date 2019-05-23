class SpecialistPolicy < BasePolicy
  def is_specialist
    return true if user.try(:has_permission?, "admin")
    record == user
  end
end
