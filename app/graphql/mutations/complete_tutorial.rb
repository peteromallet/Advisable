# Marks a given tutorial as completed
class Mutations::CompleteTutorial < Mutations::BaseMutation
  argument :tutorial, String, required: true

  field :viewer, Types::ViewerUnion, null: true
  field :errors, [Types::Error], null: true

  def authorized?(tutorial:)
    return true if context[:current_user].present?
    [false, { errors: [{ code: "notAuthenticated" }] }]
  end

  def resolve(tutorial:)
    viewer = context[:current_user]
    viewer.complete_tutorial(tutorial)
    { viewer: viewer }
  end
end
