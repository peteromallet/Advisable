# frozen_string_literal: true

module Toby
  module Types
    class MutationType < GraphQL::Schema::Object
      Toby::Resources.resource_classes.each do |admin|
        # field admin.update_mutation_name, mutation: admin.update_mutation
      end
    end
  end
end
