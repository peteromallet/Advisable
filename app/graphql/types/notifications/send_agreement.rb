# frozen_string_literal: true

module Types
  module Notifications
    class SendAgreement < Types::BaseType
      implements Types::NotificationInterface

      field :interview, Types::Interview, null: false

      field :specialist, Types::SpecialistType, null: false
      def specialist
        object.interview&.specialist
      end

      field :user, Types::User, null: false
      def user
        object.interview&.user
      end
    end
  end
end
