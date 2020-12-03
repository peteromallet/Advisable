class BasePolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def is_admin
    user&.account&.admin?
  end

  def is_team_manager?
    user.is_a?(User) && user.account.team_manager?
  end

  def belongs_to_company?
    user.is_a?(User) && user.company.users.include?(belongs_to_company_record_user)
  end

  def is_company_team_manager?
    belongs_to_company? && is_team_manager?
  end

  private

  def belongs_to_company_record_user
    record.try(:user)
  end
end
