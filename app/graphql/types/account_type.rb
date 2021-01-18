# frozen_string_literal: true

class Types::AccountType < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: true
  field :first_name, String, null: true
  field :last_name, String, null: true

  def id
    object.uid
  end
end
