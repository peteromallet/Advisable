# frozen_string_literal: true

module Types
  class InternalInvoice < Types::BaseType
    description "Type for Invoice model"

    field :id, ID, null: false, method: :uid
  end
end
