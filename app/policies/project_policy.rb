# frozen_string_literal: true

class ProjectPolicy < BasePolicy
  def read?
    owner? || company_owner? || admin?
  end
  alias publish? read?

  def delete?
    owner? || (company_owner? && team_manager?) || admin?
  end

  def can_access_project?
    return true if record.status == "Brief Pending Confirmation"

    read?
  end

  def owner?
    record.user == current_user
  end
end
