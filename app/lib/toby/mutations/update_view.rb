# frozen_string_literal: true

module Toby
  module Mutations
    class UpdateView < GraphQL::Schema::Mutation
      argument :id, ID, required: true
      argument :name, ID, required: false
      argument :filters, [Types::FilterInput], required: false

      field :view, Types::ViewType, null: true

      def resolve(**args)
        view = ::TobyView.find(args[:id])
        view.name = args[:name] if args.key?(:name)
        view.filters = args[:filters] if args.key?(:filters)
        view.save

        {view: view}
      end
    end
  end
end
