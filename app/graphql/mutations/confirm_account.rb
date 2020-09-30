class Mutations::ConfirmAccount < Mutations::BaseMutation
  include Mutations::Helpers::Authentication
  argument :email, String, required: true
  argument :token, String, required: true

  field :viewer, Types::ViewerUnion, null: true

  def resolve(email:, token:)
    account = ExtractedAccount.find_by_email!(email)
    ApiError.invalid_request(code: 'ALREADY_CONFIRMED') if account.confirmed
    validate_token(account, token)
    account.confirmed_at = Time.zone.now
    account.confirmation_digest = nil
    account.confirmation_token = nil
    account.save(validate: false)
    login_as(account)

    {viewer: account}
  end

  private

  def validate_token(account, token)
    valid =
      BCrypt::Password.new(account.confirmation_digest).is_password?(token)
    return if valid
    ApiError.invalid_request(code: 'INVALID_CONFIRMATION_TOKEN')
  rescue BCrypt::Errors::InvalidHash => e
    ApiError.invalid_request(code: 'INVALID_CONFIRMATION_TOKEN')
  end
end
