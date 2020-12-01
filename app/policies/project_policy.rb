class ProjectPolicy < BasePolicy
  def read?
    is_owner? || belongs_to_company? || is_admin
  end

  def publish?
    is_owner? || is_admin
  end
  alias delete? publish?

  def can_access_project?
    return true if record.status == "Brief Pending Confirmation"

    read?
  end

  def is_owner?
    record.user == user
  end

  def belongs_to_company?
    user && user.company.users.include?(record.user)
  end
end
