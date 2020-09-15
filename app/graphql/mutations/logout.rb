class Mutations::Logout < Mutations::BaseMutation
  include Mutations::Helpers::Authentication

  field :success, Boolean, null: true

  def resolve(*args)
    requires_current_user!
    logout
    {success: true}
  end
end
