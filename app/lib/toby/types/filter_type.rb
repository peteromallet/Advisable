# frozen_string_literal: true

module Toby
  module Types
    class FilterType < GraphQL::Schema::Object
      field :attribute, ID, null: false
      field :type, String, null: false
      field :value, [String], null: false
    end
  end
end
