# frozen_string_literal: true

module Types
  class LastPaymentErrorType < Types::BaseType
    field :code, String, null: false
  end
end
