class Mutations::Guild::UpdateLastRead < Mutations::BaseMutation
  description "Updates the guild last read time for a corresponding event"
  graphql_name "GuildUpdateLastRead"

  argument :read_notifications, Boolean, required: false
  argument :read_messages, Boolean, required: false

  field :guild_unread_messages, Boolean, null: true
  field :guild_unread_notifications, Boolean, null: true
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
    current_user = context[:current_user]
    current_user.touch_guild_messages_last_read if args[:read_messages]
    current_user.touch_guild_notifications_last_read if args[:read_notifications]

    return current_user.slice(
      :guild_unread_messages,
      :guild_unread_notifications
    )
  end
end
