class ProjectPolicy < BasePolicy
  def can_access_project?
    return true if record.status == "Brief Pending Confirmation"
    return true if user.try(:has_permission?, "projects:all")
    record.user == user
  end
end