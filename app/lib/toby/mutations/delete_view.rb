# frozen_string_literal: true

module Toby
  module Mutations
    class DeleteView < GraphQL::Schema::Mutation
      argument :id, ID, required: true

      field :success, Boolean, null: true

      def resolve(**args)
        view = ::TobyView.find(args[:id])
        view.destroy

        {success: true}
      end
    end
  end
end
