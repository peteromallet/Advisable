# frozen_string_literal: true

module Toby
  module Mutations
    class CreateView < GraphQL::Schema::Mutation
      argument :name, String, required: true
      argument :resource, String, required: true
      argument :filters, [Types::FilterInput], required: false

      field :view, Types::ViewType, null: true

      def resolve(**args)
        view = TobyView.create!(
          name: args[:name],
          resource: args[:resource],
          filters: args[:filters]
        )

        {view: view}
      end
    end
  end
end
