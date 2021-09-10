# frozen_string_literal: true

module Toby
  module Mutations
    class UpdateView < GraphQL::Schema::Mutation
      argument :id, ID, required: true
      argument :name, String, required: false
      argument :sort_by, String, required: false
      argument :sort_order, String, required: false
      argument :filters, [Types::FilterInput], required: false

      field :view, Types::ViewType, null: true

      def resolve(**args)
        view = ::TobyView.find(args[:id])

        %i[name sort_by sort_order filters].each do |key|
          view.public_send("#{key}=", args[key]) if args[key]
        end

        view.save!

        {view: view}
      end
    end
  end
end
