class ApplicationPolicy < BasePolicy
  def is_client_owner?
    record.project.user == user
  end

  def is_specialist?
    record.specialist == user
  end

  def is_owner_or_manager?
    is_client_owner? || is_company_team_manager?
  end
  alias set_type_for_project? is_owner_or_manager?
  alias stop_working? is_owner_or_manager?
  alias start_working? is_owner_or_manager?

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
