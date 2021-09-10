# frozen_string_literal: true

module Toby
  module Mutations
    class CreateView < GraphQL::Schema::Mutation
      argument :name, String, required: true
      argument :resource, String, required: true
      argument :sort_by, String, required: false
      argument :sort_order, String, required: false
      argument :filters, [Types::FilterInput], required: false

      field :view, Types::ViewType, null: true

      def resolve(**args)
        view = TobyView.create!(
          name: args[:name],
          resource: args[:resource],
          sort_by: args[:sort_by],
          sort_order: args[:sort_order],
          filters: args[:filters]
        )

        {view: view}
      end
    end
  end
end
