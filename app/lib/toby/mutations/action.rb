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
        action = resource.actions.find { |a| a.name == name.to_sym }
        result = action.execute(model, context, responsible_id: current_account_id)
        result.is_a?(Hash) ? result : {resource: model}
      end
    end
  end
end
