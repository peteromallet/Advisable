# frozen_string_literal: true

module Toby
  module Mutations
    class Create < GraphQL::Schema::Mutation
      class << self
        attr_accessor :resource
      end

      def resolve(attributes:)
        resource = self.class.resource
        model = resource.model.new

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
