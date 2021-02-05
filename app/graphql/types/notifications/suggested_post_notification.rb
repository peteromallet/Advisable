# frozen_string_literal: true

module Types
  module Notifications
    class SuggestedPostNotification < Types::BaseType
      implements Types::NotificationInterface

      field :guild_post, Types::Guild::PostInterface, null: false
      def guild_post
        object.notifiable
      end

      field :specialist, Types::SpecialistType, null: true
      def specialist
        object.notifiable&.specialist
      end
    end
  end
end
