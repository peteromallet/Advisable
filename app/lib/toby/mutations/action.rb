# frozen_string_literal: true

module Toby
  module Mutations
    class Action < GraphQL::Schema::Mutation
      include Helpers::Session

      class << self
        attr_accessor :resource
      end

      def resolve(id:, name:)
        resource = self.class.resource
        model = resource.model.find(id)
        result = Logidze.with_responsible(current_account_id) do
          resource.public_send(name, model, context)
        end
        result.is_a?(Hash) ? result : {resource: model}
      end
    end
  end
end
