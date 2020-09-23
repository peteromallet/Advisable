class Mutations::Guild::UpdateLastRead < Mutations::BaseMutation
  description "Updates the guild last read time for a corresponding event"
  graphql_name "GuildUpdateLastRead"

  argument :read_notifications, Boolean, required: false
  argument :read_messages, Boolean, required: false

  field :viewer, Types::ViewerUnion, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    unless context[:current_user]
      raise ApiError::NotAuthenticated.new('You are not logged in')
    end

    unless context[:current_user].try(:guild)
      raise GraphQL::ExecutionError.new('Invalid Permissions', options: {code: 'invalidPermissions'})
    end

    if context[:current_user].is_a?(User)
      raise ApiError::NotAuthenticated.new('You are logged in as a user')
    end

    true
  end

  def resolve(**args)
    viewer = context[:current_user]
    viewer.touch_guild_messages_last_read if args[:read_messages]
    viewer.touch_guild_notifications_last_read if args[:read_notifications]

    {viewer: viewer}
  end
end
