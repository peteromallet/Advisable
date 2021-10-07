# frozen_string_literal: true

module Mutations
  class UpdateLastReadNotification < Mutations::BaseMutation
    description "Updates any unread  notifications to read"

    field :viewer, Types::ViewerUnion, null: true

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(**_args)
      viewer = current_user
      current_user.account.mark_all_notifications_as_read!

      {viewer: viewer}
    end
  end
end
