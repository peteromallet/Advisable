# frozen_string_literal: true

module Toby
  module Mutations
    class Update < GraphQL::Schema::Mutation
      class << self
        attr_accessor :resource
      end

      def resolve(id:, attributes:)
        resource = self.class.resource
        model = resource.model.find(id)

        attributes.each do |key, value|
          attribute = resource.attributes.find { |attr| attr.name == key }
          attribute.write(model, value)
        end

        model.save!

        {resource: model}
      end
    end
  end
end
