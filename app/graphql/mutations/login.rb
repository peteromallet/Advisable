class Mutations::Login < Mutations::BaseMutation
  include Mutations::Helpers::Authentication

  argument :email, String, required: true
  argument :password, String, required: true

  field :viewer, Types::ViewerUnion, null: true

  def resolve(email:, password:)
    account = Account.find_by_email(email.downcase)
    no_account_error unless has_account?(account)
    invalid_credentials unless account.authenticate(password)
    login_as(account)
    { viewer: account }
  end

  private

  def no_account_error
    ApiError.invalid_request(
      code: 'AUTHENTICATION_FAILED', message: 'Account does not exist'
    )
  end

  def invalid_credentials
    ApiError.invalid_request(
      code: 'AUTHENTICATION_FAILED', message: 'Invalid credentials'
    )
  end

  def has_account?(account)
    return false if account.nil?
    account.password_digest?
  end
end
