# frozen_string_literal: true

module Guild
  class BasePolicy < BasePolicy
    def guild_user?
      current_user.try(:guild)
    end
  end
end
