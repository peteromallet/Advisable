class Mutations::Guild::UpdateLastRead < Mutations::BaseMutation
  description "Updates the guild last read time for a corresponding event"
  graphql_name "GuildUpdateLastRead"

  argument :read_notifications, Boolean, required: false
  argument :read_messages, Boolean, required: false

  field :viewer, Types::ViewerUnion, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    requires_guild_user!

    true
  end

  def resolve(**args)
    viewer = context[:current_user]
    viewer.touch_guild_messages_last_read if args[:read_messages]
    viewer.touch_guild_notifications_last_read if args[:read_notifications]

    {viewer: viewer}
  end
end
