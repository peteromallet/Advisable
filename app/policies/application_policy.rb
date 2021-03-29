# frozen_string_literal: true

class ApplicationPolicy < BasePolicy
  def client_owner?
    record.project.user == current_user
  end

  def specialist?
    record.specialist == current_user
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
