# frozen_string_literal: true

class ApplicationPolicy < BasePolicy
  def user_owner?
    record.interview&.user == current_user
  end

  def specialist?
    record.specialist == current_user
  end
  alias_method :send_proposal?, :specialist?
  alias_method :reject_invitation?, :specialist?

  def owner_or_manager?
    user_owner? || (owned_by_company? && team_manager?)
  end
  alias_method :set_type_for_project?, :owner_or_manager?
  alias_method :start_working?, :owner_or_manager?

  def owned_by_user_or_company?
    user_owner? || owned_by_company?
  end

  def read?
    specialist? || owned_by_user_or_company? || admin?
  end
  alias_method :write?, :read?
  alias_method :create?, :read?

  def stop_working?
    owner_or_manager? || specialist?
  end

  private

  def company_of_record
    record.interview&.user&.company
  end
end
