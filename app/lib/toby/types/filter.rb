# frozen_string_literal: true

module Toby
  module Types
    class Filter < GraphQL::Schema::InputObject
      argument :attribute, String, required: true
      argument :type, String, required: true
      argument :value, String, required: false
      argument :values, [String], required: false
    end
  end
end
