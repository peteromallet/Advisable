class ProjectPolicy < BasePolicy
  def is_client
    record.user == user || is_admin
  end

  def can_access_project?
    return true if record.status == "Brief Pending Confirmation"

    is_client
  end
end
