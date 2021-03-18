# frozen_string_literal: true

class ApplicationPolicy < BasePolicy
  def client_owner?
    record.project.user == user
  end

  def specialist?
    record.specialist == user
  end
  alias send_proposal? specialist?
  alias reject_invitation? specialist?

  def owner_or_manager?
    client_owner? || is_company_team_manager?
  end
  alias set_type_for_project? owner_or_manager?
  alias start_working? owner_or_manager?

  def via_client?
    client_owner? || record_belongs_to_company?
  end

  # Whether or not the user has access to read information about the application.
  def read?
    specialist? || via_client? || admin?
  end
  alias write? read?
  alias create? read?

  def stop_working?
    owner_or_manager? || specialist?
  end

  private

  def company_of_record
    record.project&.user&.company
  end
end
