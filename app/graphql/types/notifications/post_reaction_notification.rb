# frozen_string_literal: true

module Types
  module Notifications
    class PostReactionNotification < Types::BaseType
      implements Types::NotificationInterface

      field :guild_post, Types::Guild::PostInterface, null: false
      def guild_post
        object.notifiable&.reactionable
      end

      field :specialist, Types::SpecialistType, null: true
      def specialist
        object.actor&.specialist
      end
    end
  end
end
