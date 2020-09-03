class Guild::PostPolicy < Guild::BasePolicy
  def show
    record&.published? && is_guild_user?
  end
end
