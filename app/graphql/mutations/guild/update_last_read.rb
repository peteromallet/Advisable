# frozen_string_literal: true

module Mutations
  module Guild
    class UpdateLastRead < Mutations::BaseMutation
      description "Updates any unread guild notifications to read"
      graphql_name "GuildUpdateLastRead"
      argument :read_notifications, Boolean, required: false, deprecation_reason: "Last read is automatically updated"

      field :viewer, Types::ViewerUnion, null: true

      def authorized?(**_args)
        requires_guild_user!
      end

      def resolve(**_args)
        viewer = current_user
        current_user.account.mark_all_notifications_as_read!

        {viewer: viewer}
      end
    end
  end
end
