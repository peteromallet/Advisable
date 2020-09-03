class Guild::BasePolicy < BasePolicy
  def is_guild_user?
    user.try(:guild)
  end
end
