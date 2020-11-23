module Advisatable
  module Mutations
    class Create < GraphQL::Schema::Mutation
      class << self
        attr_accessor :resource
      end

      def resolve(attributes:)
        resource = self.class.resource
        model = resource.model.new

        attributes.each do |key, value|
          column = resource.columns.find { |a| a.attribute == key }
          column.write(model, value)
        end

        model.save

        {resource: model}
      end
    end
  end
end
