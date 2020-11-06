class Mutations::ResendConfirmationEmail < Mutations::BaseMutation
  field :viewer, Types::ViewerUnion, null: true

  def authorized?
    requires_current_user!
  end

  def resolve(**args)
    current_user.send_confirmation_email
    {viewer: current_user}
  end
end
