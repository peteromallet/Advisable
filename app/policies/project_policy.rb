class ProjectPolicy < ApplicationPolicy
  def is_user?
    record.user == user
  end
end