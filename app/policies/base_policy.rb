# frozen_string_literal: true

class BasePolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def admin?
    user&.account&.admin?
  end
  alias is_admin admin?

  def is_admin # rubocop:disable Naming/PredicateName
    Raven.capture_message("Somebody is still using this :unamused:", backtrace: caller)
    admin?
  end

  def is_team_manager? # rubocop:disable Naming/PredicateName
    user.is_a?(::User) && user.account.team_manager?
  end

  def record_belongs_to_company?
    user.is_a?(::User) && user.company == company_of_record
  end

  def is_company_team_manager? # rubocop:disable Naming/PredicateName
    record_belongs_to_company? && is_team_manager?
  end

  private

  # .try will return nil even when record doesn't respond to #user
  def company_of_record
    record.try(:user)&.company
  end
end
