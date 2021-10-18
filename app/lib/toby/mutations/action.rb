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

        if resource.method(name).parameters.count == 1
          Logidze.with_responsible(current_account_id) do
            resource.public_send(name, model)
            model.save!
          end
          model.sync_to_airtable if model.respond_to?(:sync_to_airtable) && model.airtable_id.present?
          {resource: model}
        else
          result = resource.public_send(name, model, context)

          # result => {:redirect_to=>"/"}
          {result: result}
        end
      end
    end
  end
end
