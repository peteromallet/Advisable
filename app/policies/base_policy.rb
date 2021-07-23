# frozen_string_literal: true

class BasePolicy
  attr_reader :current_user, :record, :current_account

  def initialize(current_user, record, current_account = nil)
    @current_user = current_user
    @record = record
    @current_account = current_account
  end

  # TODO: Stop using these 3 directly - make them private ▼
  def admin?
    current_account&.admin? || current_user&.account&.admin?
  end

  def team_manager?
    current_user.is_a?(::User) && current_user.account.team_manager?
  end

  def owned_by_company?
    current_user.is_a?(::User) && current_user.company == company_of_record
  end
  # TODO: Stop using these 3 directly - make them private ▲

  private

  def editor?
    current_user&.account&.editor?
  end

  def specialist_owner?
    record.specialist == current_user
  end

  def user_owner?
    record.user == current_user
  end

  def owned_by_user_or_company?
    user_owner? || owned_by_company?
  end

  def company_of_record
    record.respond_to?(:user) && record.user&.company
  end
end
