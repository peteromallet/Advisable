# frozen_string_literal: true

class BasePolicy
  attr_reader :current_user, :record

  def initialize(current_user, record)
    @current_user = current_user
    @record = record
  end

  # TODO: Stop using these 3 directly - make them private ▼
  def admin?
    current_user&.account&.admin?
  end

  def team_manager?
    current_user.is_a?(::User) && current_user.account.team_manager?
  end

  def company_owner?
    current_user.is_a?(::User) && current_user.company == company_of_record
  end
  # TODO: Stop using these 3 directly - make them private ▲

  private

  def specialist_owner?
    record.specialist == current_user
  end

  def user_owner?
    record.user == current_user
  end

  def user_or_company_owner?
    user_owner? || company_owner?
  end

  def company_of_record
    record.respond_to?(:user) && record.user&.company
  end
end
