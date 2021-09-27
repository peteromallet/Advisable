# frozen_string_literal: true

module Mutations
  module Guild
    class SendPostMessage < Mutations::BaseMutation
      description "Sends a guild post author a message"

      graphql_name "SendGuildPostMessage"
      argument :calendly_url, String, required: false
      argument :content, String, required: true
      argument :post, ID, required: false

      field :message, Types::GuildPostMessage, null: true

      def authorized?(**_args)
        requires_guild_user!
      end

      def resolve(**args)
        post = ::Guild::Post.find(args[:post])
        accounts = [post.specialist.account, current_account]
        conversation = ::Conversation.by_accounts(accounts)
        metadata = {}
        metadata[:calendly_url] = args[:calendly_url] if args.key?(:calendly_url)
        message = conversation.new_message!(current_account, args[:content], [], {
          guild_post: post,
          metadata: metadata
        })

        {message: message}
      end
    end
  end
end
