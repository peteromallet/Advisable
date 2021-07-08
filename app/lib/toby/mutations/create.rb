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
        model = resource.model.new

        attributes.each do |key, value|
          attribute = resource.attributes.find { |attr| attr.name == key }
          attribute.write(model, value)
        end

        Logidze.with_responsible(current_account_id) do
          model.save!
        end

        model.sync_to_airtable if model.respond_to?(:sync_to_airtable) && model.airtable_id.present?

        {resource: model}
      end
    end
  end
end
