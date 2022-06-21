# frozen_string_literal: true

module Types
  class Account < Types::BaseType
    description "Type for the Account model."

    field :id, ID, null: false, method: :uid
    field :first_name, String, null: true
    field :last_name, String, null: true
    field :name, String, null: true
    field :timezone, String, null: true
    field :avatar, String, null: true, method: :cached_avatar_url
    field :availability, [GraphQL::Types::ISO8601DateTime], null: false
    field :user, Types::User, null: true
    field :specialist, Types::SpecialistType, null: true
    field :email, String do
      authorize :current_account?
    end

    field :is_viewer, Boolean, null: true
    def is_viewer
      current_user.account == object
    end

    field :subscriptions, [Types::AccountSubscription], null: false
    def subscriptions
      ::Account::SUBSCRIPTIONS.map do |subscription|
        {
          name: subscription,
          subscribed: !object.unsubscribed?(subscription)
        }
      end
    end

    field :upcoming_interviews, [Types::Interview], null: false
    def upcoming_interviews
      ::Interview.upcoming.with_accounts([object, current_user.account])
    end
  end
end
