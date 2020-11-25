class BasePolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def is_admin
    user&.account&.admin?
  end
end
