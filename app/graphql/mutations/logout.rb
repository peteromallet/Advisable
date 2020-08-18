class Mutations::Logout < Mutations::BaseMutation
  include Mutations::Helpers::Authentication

  field :success, Boolean, null: true

  def resolve(*args)
    not_logged_in unless context[:current_user]
    logout
    { success: true }
  end

  private

  def not_logged_in
    ApiError.not_authenticated
  end
end
