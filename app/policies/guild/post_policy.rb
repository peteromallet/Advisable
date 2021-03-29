# frozen_string_literal: true

module Guild
  class PostPolicy < Guild::BasePolicy
    def show
      record.specialist == current_user || published_and_guild? || published_and_shareable?
    end

    def create_comment
      published_and_guild?
    end

    private

    def published_and_guild?
      record&.published? && guild_user?
    end

    def published_and_shareable?
      record&.published? && record&.shareable
    end
  end
end
