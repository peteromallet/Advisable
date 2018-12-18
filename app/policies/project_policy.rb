class ProjectPolicy < ApplicationPolicy
  def pending_setup_or_is_user?
    return true if record.status == "Brief Pending Confirmation"
    record.user == user
  end
end