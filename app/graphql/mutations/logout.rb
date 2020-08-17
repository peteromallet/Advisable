class Mutations::Logout < Mutations::BaseMutation
  field :success, Boolean, null: true

  def resolve(*args)
    not_logged_in unless context[:current_user]
    cookies = context[:cookies]
    cookies.delete(:remember)
    session = context[:session]
    session.delete(:account_uid)
    { success: true }
  end

  private

  def not_logged_in
    ApiError.not_authenticated
  end
end
