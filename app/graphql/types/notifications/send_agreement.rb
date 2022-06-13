# frozen_string_literal: true

module Types
  module Notifications
    class SendAgreement < Types::BaseType
      implements Types::NotificationInterface

      field :interview, Types::Interview, null: false
    end
  end
end
