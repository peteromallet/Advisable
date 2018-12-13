class ProjectPolicy < ApplicationPolicy
  def client?
    record.client.users.include?(user)
  end
end