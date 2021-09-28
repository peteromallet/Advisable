# frozen_string_literal: true

module Types
  class Review < Types::BaseType
    implements Types::ReviewInterface

    description 'A type for a basic Review'

    field :company_name, String, null: true
    field :relationship, String, null: true
  end
end
