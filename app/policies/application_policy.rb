class ApplicationPolicy < BasePolicy
  def is_client_owner?
    record.project.user == user
  end

  def is_specialist?
    record.specialist == user
  end

  def set_type_for_project?
    is_client_owner? || is_company_team_manager?
  end
  alias stop_working? set_type_for_project?

  def via_client?
    is_client_owner? || record_belongs_to_company?
  end
  alias reject_proposal? via_client?

  # Wether or not the user has access to read information about the application.
  def read?
    is_specialist? || via_client? || is_admin
  end
  alias write? read?
  alias create? read?

  private

  def company_of_record
    record.project&.user&.company
  end
end
