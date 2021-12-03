# frozen_string_literal: true

module Toby
  module Mutations
    class Update < GraphQL::Schema::Mutation
      include Helpers::Session

      class << self
        attr_accessor :resource
      end

      def resolve(id:, attributes:)
        resource = self.class.resource
        record = resource.model.find(id)
        current_account_responsible_for { resource.save(record, attributes) }
        {resource: record}
      end
    end
  end
end
