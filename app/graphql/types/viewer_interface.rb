# frozen_string_literal: true

module Types
  module ViewerInterface
    include Types::BaseInterface

    description "Fields that are common for all types that have an account"
    orphan_types Types::User, Types::SpecialistType

    definition_methods do
      def resolve_type(object, _)
        if object.is_a?(::User)
          Types::User
        else
          Types::SpecialistType
        end
      end
    end

    field :id, ID, null: false, method: :uid
    field :account, Types::Account, null: false
    def account
      dataloader.with(::ActiveRecordSource, ::Account).load(object.account_id)
    end

    field :first_name, String, null: true
    field :last_name, String, null: true
    field :name, String, null: true
    field :features, [String], null: true
    field :availability, [GraphQL::Types::ISO8601DateTime], null: false
    delegate :name, :first_name, :last_name, :features, :availability, to: :account

    field :avatar, String, null: true
    def avatar
      account.cached_avatar_url
    end

    field :needs_to_set_a_password, Boolean, null: true
    def needs_to_set_a_password
      account.auth_providers.none? && account.password_digest.blank?
    end

    field :confirmed, Boolean, null: false
    def confirmed
      account.confirmed_at.present?
    end

    field :unread_notifications, Boolean, null: false
    def unread_notifications
      account.unread_notifications?
    end

    field :conversation, Types::Conversation, null: true
    def conversation
      Conversation.find_existing_with([current_user.account, object.account])
    end

    field :interviews, [Types::Interview], null: true do
      argument :status, String, required: false
      authorize :user?
    end
    def interviews(status: nil)
      interviews = account.interviews
      interviews = interviews.where(status:) if status
      interviews
    end
  end
end
