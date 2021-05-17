# frozen_string_literal: true

# Marks a given tutorial as completed
module Mutations
  class CompleteTutorial < Mutations::BaseMutation
    argument :tutorial, String, required: true

    field :viewer, Types::ViewerUnion, null: true

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(tutorial:)
      viewer = current_user
      viewer.account.complete_tutorial(tutorial)
      {viewer: viewer}
    end
  end
end
