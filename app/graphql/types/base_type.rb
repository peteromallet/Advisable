# frozen_string_literal: true

module Types
  class BaseType < GraphQL::Schema::Object
    include CurrentUserUtilities
    field_class BaseField
  end
end
