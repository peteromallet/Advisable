# frozen_string_literal: true

module Types
  class Account < Types::BaseType
    description "Type for the Account model."

    field :id, ID, null: false, method: :uid
    field :first_name, String, null: true
    field :last_name, String, null: true
    field :name, String, null: true
    field :avatar, String, null: true
    def avatar
      Rails.cache.fetch("account_avatar_#{object.id}", expires_in: 1.day) do
        object.specialist_or_user.resized_avatar_url
      end
    end

    field :is_viewer, Boolean, null: true
    def is_viewer
      current_user.account == object
    end
  end
end
