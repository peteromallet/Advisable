# frozen_string_literal: true

module Guild
  class CommentPolicy < BasePolicy
    def delete_comment
      accepted? && (record.specialist_id == current_user.id)
    end

    def create_child_comment
      accepted? && record.published?
    end
  end
end
