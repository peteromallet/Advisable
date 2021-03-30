# frozen_string_literal: true

module Types
  class MutationType < GraphQL::Schema::Object
    EXCLUDED_CLASSES = %i[BaseMutation Helpers Guild].freeze
    (Mutations.constants - EXCLUDED_CLASSES).each do |klass|
      public_send(:field, klass.to_s.underscore, mutation: "Mutations::#{klass}".constantize)
    end

    # Guild
    field :create_guild_comment, mutation: Mutations::Guild::CreateComment
    field :guild_update_last_read, mutation: Mutations::Guild::UpdateLastRead
    field :guild_update_post_reactions, mutation: Mutations::Guild::UpdatePostReactions
    field :create_chat_direct_message, mutation: Mutations::Guild::CreateChatDirectMessage
    field :create_guild_post, mutation: Mutations::Guild::CreateGuildPost
    field :update_guild_post, mutation: Mutations::Guild::UpdateGuildPost
    field :delete_guild_post_image, mutation: Mutations::Guild::DeleteGuildPostImage
    field :create_guild_post_image, mutation: Mutations::Guild::CreateGuildPostImage
    field :update_guild_post_image, mutation: Mutations::Guild::UpdateGuildPostImage
    field :delete_guild_post, mutation: Mutations::Guild::DeleteGuildPost
    field :resolve_guild_post, mutation: Mutations::Guild::ResolveGuildPost
    field :update_event_registration, mutation: Mutations::UpdateEventRegistration
  end
end
