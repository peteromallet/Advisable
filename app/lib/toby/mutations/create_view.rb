# frozen_string_literal: true

module Toby
  module Mutations
    class CreateView < GraphQL::Schema::Mutation
      argument :name, ID, required: false
      argument :filters, [Types::FilterInput], required: false

      field :view, Types::ViewType, null: true

      def resolve(name:, filters:)
        view = TobyView.create!(
          name: name,
          filters: filters
        )

        {view: view}
      end
    end
  end
end
