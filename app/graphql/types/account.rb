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
      object.specialist_or_user.resized_avatar_url
    end
  end
end
