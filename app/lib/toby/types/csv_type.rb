# frozen_string_literal: true

module Toby
  module Types
    class CsvType < GraphQL::Schema::Object
      field :content, String, null: false
    end
  end
end
