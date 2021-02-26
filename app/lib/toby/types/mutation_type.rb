# frozen_string_literal: true

module Toby
  module Types
    class MutationType < GraphQL::Schema::Object
      Toby::Resources.resource_classes.each do |resource|
        field resource.query_name_update, mutation: resource.update_mutation
        field resource.query_name_create, mutation: resource.create_mutation
      end
    end
  end
end
