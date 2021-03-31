# frozen_string_literal: true

class ProjectPolicy < BasePolicy
  def read?
    owner? || owned_by_company? || admin?
  end
  alias publish? read?

  def delete?
    owner? || (owned_by_company? && team_manager?) || admin?
  end

  def can_access_project?
    return true if record.status == "Brief Pending Confirmation"

    read?
  end

  def owner?
    record.user == current_user
  end
end
