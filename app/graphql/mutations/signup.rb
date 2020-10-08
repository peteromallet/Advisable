class Mutations::Signup < Mutations::BaseMutation
  include Mutations::Helpers::Authentication

  argument :id, ID, required: true
  argument :email, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  field :viewer, Types::ViewerUnion, null: true

  def resolve(**args)
    email_taken?(args[:email])
    specialist_or_user = SpecialistOrUser.find_by_uid_or_airtable_id!(args[:id])
    account = specialist_or_user.account
    valid_account_already_exists?(account)

    account.assign_attributes(
      email: args[:email],
      password: args[:password],
      password_confirmation: args[:password_confirmation]
    )

    if account.save
      specialist_or_user.send_confirmation_email
      specialist_or_user.sync_to_airtable
    else
      signup_failed(account)
    end

    # TODO: AccountMigration - Fix session to support Account natively
    login_as(specialist_or_user)
    {viewer: specialist_or_user}
  end

  private

  def email_taken?(email)
    account = Account.find_by(email: email)
    if account&.has_password?
      ApiError.invalid_request(code: 'ACCOUNT_EXISTS', message: 'Account with this email already exists')
    end
  end

  def valid_account_already_exists?(account)
    if account.has_password?
      ApiError.invalid_request(code: 'ACCOUNT_EXISTS', message: 'Account already exists')
    end
  end

  def signup_failed(account)
    message = account.errors.full_messages.first
    ApiError.invalid_request(code: 'SIGNUP_FAILED', message: message)
  end
end
