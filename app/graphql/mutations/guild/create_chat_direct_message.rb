# frozen_string_literal: true

module Mutations
  module Guild
    class CreateChatDirectMessage < Mutations::BaseMutation
      description "Creates or updates a 1:1 direct chat message channel"

      argument :body, String, required: true
      argument :guild_calendly_link, String, required: false
      argument :guild_post_id, ID, required: false
      argument :recipient_id, ID, required: true

      field :enqueued, Boolean, null: true

      def authorized?(**_args)
        requires_guild_user!
      end

      def resolve(recipient_id:, body:, guild_post_id: nil, guild_calendly_link: nil)
        identity = current_user.uid

        ChatDirectMessageJob.perform_later(
          message: body,
          sender_uid: identity,
          recipient_uid: recipient_id,
          guild_post_id: guild_post_id,
          guild_calendly_link: guild_calendly_link
        )

        {enqueued: true}
      end
    end
  end
end
