# frozen_string_literal: true

module Toby
  module Mutations
    class Create < GraphQL::Schema::Mutation
      include Helpers::Session

      class << self
        attr_accessor :resource
      end

      def resolve(attributes:)
        resource = self.class.resource
        record = resource.model.new
        current_account_responsible_for { resource.save(record, attributes) }
        {resource: record}
      end
    end
  end
end
