# frozen_string_literal: true

module Types
  class GuildPostMessage < Types::UserMessage
    graphql_name "GuildPostMessage"
    description "Type for the Message model when it has a guild post."

    field :post, Types::Guild::Post, null: false, method: :guild_post

    field :calendly_url, String, null: true
    def calendly_url
      object.metadata["calendly_url"]
    end
  end
end
