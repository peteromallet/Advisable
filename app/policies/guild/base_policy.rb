class Guild::BasePolicy < BasePolicy
  def is_guild_user?
    current_user.try(:guild)
  end
end
