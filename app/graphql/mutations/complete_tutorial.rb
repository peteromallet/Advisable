# frozen_string_literal: true

# Marks a given tutorial as completed
class Mutations::CompleteTutorial < Mutations::BaseMutation
  argument :tutorial, String, required: true

  field :viewer, Types::ViewerUnion, null: true

  def authorized?(tutorial:)
    requires_current_user!
  end

  def resolve(tutorial:)
    viewer = context[:current_user]
    viewer.complete_tutorial(tutorial)
    {viewer: viewer}
  end
end
