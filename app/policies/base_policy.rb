class BasePolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def has_permission?(permission)
    user&.account&.has_permission?(permission)
  end

  def is_admin
    user&.account&.has_permission?("admin")
  end
end
