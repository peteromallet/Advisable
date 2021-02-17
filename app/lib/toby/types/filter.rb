# frozen_string_literal: true

module Toby
  module Types
    class Filter < GraphQL::Schema::InputObject
      argument :attribute, String, required: true
      argument :type, String, required: true
      argument :content, String, required: false
      argument :contents, [String], required: false
    end
  end
end
