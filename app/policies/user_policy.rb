class UserPolicy < BasePolicy
  def is_user
    record == user
  end
end