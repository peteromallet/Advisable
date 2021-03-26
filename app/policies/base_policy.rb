# frozen_string_literal: true

class BasePolicy
  attr_reader :current_user, :record

  def initialize(current_user, record)
    @current_user = current_user
    @record = record
  end

  def user
    raise "REPLACE ME"
  end

  def admin?
    current_user&.account&.admin?
  end

  def is_team_manager? # rubocop:disable Naming/PredicateName
    current_user.is_a?(::User) && current_user.account.team_manager?
  end

  def record_belongs_to_company?
    current_user.is_a?(::User) && current_user.company == company_of_record
  end

  def is_company_team_manager? # rubocop:disable Naming/PredicateName
    record_belongs_to_company? && is_team_manager?
  end

  private

  def company_of_record
    record.respond_to?(:user) && record.user&.company
  end
end
