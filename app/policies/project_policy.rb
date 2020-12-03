class ProjectPolicy < BasePolicy
  def read?
    is_owner? || belongs_to_company? || is_admin
  end
  alias publish? read?

  def delete?
    is_owner? || is_company_team_manager? || is_admin
  end

  def can_access_project?
    return true if record.status == "Brief Pending Confirmation"

    read?
  end

  def is_owner?
    record.user == user
  end
end
