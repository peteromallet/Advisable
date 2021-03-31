# frozen_string_literal: true

class ApplicationPolicy < BasePolicy
  def user_owner?
    record.project.user == current_user
  end

  def specialist?
    record.specialist == current_user
  end
  alias send_proposal? specialist?
  alias reject_invitation? specialist?

  def owner_or_manager?
    user_owner? || (company_owner? && team_manager?)
  end
  alias set_type_for_project? owner_or_manager?
  alias start_working? owner_or_manager?

  def user_or_company_owner?
    user_owner? || company_owner?
  end

  def read?
    specialist? || user_or_company_owner? || admin?
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
