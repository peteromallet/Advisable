# frozen_string_literal: true

module Mutations
  class RequestPasswordReset < Mutations::BaseMutation
    argument :email, String, required: true

    field :sent, Boolean, null: true

    def resolve(email:)
      account = Account.find_by(email: email)

      if account.blank?
        ApiError.invalid_request("request_password_reset.account_not_found")
      elsif !account.has_password? && account.specialist.present?
        WebhookEvent.trigger("specialists.forgotten_password_for_non_account", WebhookEvent::Specialist.data(account.specialist))
        ApiError.invalid_request("request_password_reset.application_required")
      else
        account.reset_password!
        {sent: true}
      end
    end
  end
end
