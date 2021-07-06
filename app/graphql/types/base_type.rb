# frozen_string_literal: true

module Types
  class BaseType < GraphQL::Schema::Object
    include UserRequirements
    field_class BaseField
  end
end
