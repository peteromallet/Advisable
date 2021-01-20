# frozen_string_literal: true

class Mutations::ConfirmAccount < Mutations::BaseMutation
  include Mutations::Helpers::Authentication
  argument :email, String, required: true
  argument :token, String, required: true

  field :viewer, Types::ViewerUnion, null: true

  def resolve(email:, token:)
    account = Account.find_by!(email: email)
    validate_token(account, token)

    if account.confirmed_at.blank?
      account.confirmed_at = Time.zone.now
    end

    account.confirmation_digest = nil
    account.confirmation_token = nil
    Logidze.with_responsible(account.id) do
      account.save(validate: false)
    end

    login_as(account)

    {viewer: account.specialist_or_user}
  end

  private

  def validate_token(account, token)
    return if BCrypt::Password.new(account.confirmation_digest).is_password?(token)

    ApiError.invalid_request('INVALID_CONFIRMATION_TOKEN')
  rescue BCrypt::Errors::InvalidHash => e
    ApiError.invalid_request('INVALID_CONFIRMATION_TOKEN')
  end
end
