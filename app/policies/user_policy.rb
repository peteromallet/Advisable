class UserPolicy < BasePolicy
  def is_user
    return true if user.try(:has_permission?, "admin")
    record == user
  end
end
