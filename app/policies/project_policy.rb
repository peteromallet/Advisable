class ProjectPolicy < BasePolicy
  def is_client
    return true if record.user == user
    false
  end

  def can_access_project?
    return true if record.status == "Brief Pending Confirmation"
    return true if is_admin
    record.user == user
  end
end
