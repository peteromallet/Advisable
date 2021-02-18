# frozen_string_literal: true

module Toby
  module Types
    class ResourceFilterType < GraphQL::Schema::Object
      field :name, String, null: false
      field :type, String, null: false
    end
  end
end
