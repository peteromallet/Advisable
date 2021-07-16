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

        Logidze.with_responsible(current_account_id) do
          resource.public_send(name, model)
          model.save!
        end

        model.sync_to_airtable if model.respond_to?(:sync_to_airtable) && model.airtable_id.present?

        {resource: model}
      end
    end
  end
end
