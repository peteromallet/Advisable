# frozen_string_literal: true

module Toby
  module Mutations
    class Delete < GraphQL::Schema::Mutation
      class << self
        attr_accessor :resource
      end

      def resolve(id:)
        resource = self.class.resource
        model = resource.model.find(id)
        success = model.destroy

        {success:}
      end
    end
  end
end
