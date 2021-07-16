# frozen_string_literal: true

module Toby
  module Types
    class Action < GraphQL::Schema::Object
      field :name, String, null: false
    end
  end
end
