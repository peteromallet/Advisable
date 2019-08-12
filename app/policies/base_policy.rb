class BasePolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def has_permission?(permission)
    user.try(:has_permission?, permission)
  end

  def is_admin
    user.try(:has_permission?, "admin")
  end
end
