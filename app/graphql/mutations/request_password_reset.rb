# frozen_string_literal: true

class Mutations::RequestPasswordReset < Mutations::BaseMutation
  argument :email, String, required: true

  field :sent, Boolean, null: true

  def resolve(email:)
    Accounts::RequestPasswordReset.call(email)
    {sent: true}
  rescue Service::Error => e
    ApiError.service_error(e)
  end
end
