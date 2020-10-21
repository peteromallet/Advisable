class Guild::PostPolicy < Guild::BasePolicy
  def show
    public_and_guild? || record.specialist == user
  end

  def create_comment
    public_and_guild?
  end

  private
  def public_and_guild?
    record&.published? && is_guild_user?
  end
end
