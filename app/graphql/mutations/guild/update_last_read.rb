class Mutations::Guild::UpdateLastRead < Mutations::BaseMutation
  description "Updates the guild last read time for a notifications read event"
  graphql_name "GuildUpdateLastRead"

  argument :read_notifications, Boolean, required: true

  field :viewer, Types::ViewerUnion, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    requires_guild_user!

    true
  end

  def resolve(**args)
    viewer = context[:current_user]
    viewer.touch_guild_notifications_last_read

    {viewer: viewer}
  end
end
