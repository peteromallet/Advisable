# frozen_string_literal: true

class ProjectPolicy < BasePolicy
  def read?
    owner? || record_belongs_to_company? || admin?
  end
  alias publish? read?

  def delete?
    owner? || is_company_team_manager? || admin?
  end

  def can_access_project?
    return true if record.status == "Brief Pending Confirmation"

    read?
  end

  def owner?
    record.user == user
  end
end
