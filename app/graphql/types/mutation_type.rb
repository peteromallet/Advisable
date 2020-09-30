class Types::MutationType < GraphQL::Schema::Object
  EXCLUDED_CLASSES = [:BaseMutation, :Helpers, :Guild].freeze
  (Mutations.constants - EXCLUDED_CLASSES).each do |klass|
    send(:field, klass.to_s.underscore, mutation: "Mutations::#{klass}".constantize)
  end

  # Guild
  field :create_guild_comment, mutation: Mutations::Guild::CreateComment
  field :delete_guild_comment, mutation: Mutations::Guild::DeleteComment
  field :guild_update_last_read, mutation: Mutations::Guild::UpdateLastRead
  field :create_chat_direct_message, mutation: Mutations::Guild::CreateChatDirectMessage
  field :update_chat_friendly_name, mutation: Mutations::Guild::UpdateChatFriendlyName
end
