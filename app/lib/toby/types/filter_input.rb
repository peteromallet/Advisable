# frozen_string_literal: true

module Toby
  module Types
    class FilterInput < GraphQL::Schema::InputObject
      argument :attribute, String, required: true
      argument :type, String, required: true
      argument :value, [String], required: false
    end
  end
end
