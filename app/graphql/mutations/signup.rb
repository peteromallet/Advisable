class Mutations::Signup < Mutations::BaseMutation
  include Mutations::Helpers::Authentication

  argument :id, ID, required: true
  argument :email, String, required: true
  argument :password, String, required: true
  argument :password_confirmation, String, required: true

  field :viewer, Types::ViewerUnion, null: true

  def resolve(**args)
    account = ExtractedAccount.find_by_uid_or_airtable_id!(args[:id])
    account_already_exists?(account)
    email_taken?(args[:email])

    account.assign_attributes(
      email: args[:email],
      password: args[:password],
      password_confirmation: args[:password_confirmation]
    )

    if account.save
      account.send_confirmation_email
      account.sync_to_airtable
    else
      signup_failed(account)
    end

    login_as(account)
    {viewer: account}
  end

  private

  def signup_failed(account)
    message = account.errors.full_messages.first
    ApiError.invalid_request(code: 'SIGNUP_FAILED', message: message)
  end

  def email_taken?(email)
    account = ExtractedAccount.find_by_email(email)
    if account&.has_account?
      ApiError.invalid_request(
        code: 'ACCOUNT_EXISTS', message: 'Account already exists'
      )
    end
  end

  def account_already_exists?(account)
    if account.has_account?
      ApiError.invalid_request(
        code: 'ACCOUNT_EXISTS', message: 'Account already exists'
      )
    end
  end
end
