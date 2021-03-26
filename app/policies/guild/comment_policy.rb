# frozen_string_literal: true

module Guild
  class CommentPolicy < Guild::BasePolicy
    def delete_comment
      guild_user? && (record.specialist_id == current_user.id)
    end

    def create_child_comment
      guild_user? && record.published?
    end
  end
end
