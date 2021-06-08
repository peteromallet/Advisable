# frozen_string_literal: false

module Mutations
  class CreateClientAccount < Mutations::BaseMutation
    include Mutations::Helpers::BlacklistedEmail

    description "Creates a new client account"

    argument :email, String, required: true
    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :rid, String, required: false
    argument :utm_campaign, String, required: false
    argument :utm_medium, String, required: false
    argument :utm_source, String, required: false

    field :viewer, Types::ViewerUnion, null: false

    def resolve(**args)
      email_blacklisted?(args[:email])
      ActiveRecord::Base.transaction do
        account = create_account(**args)

        user = User.new(
          account: account,
          company: Company.new,
          rid: args[:rid],
          campaign_name: args[:utm_campaign],
          campaign_source: args[:utm_source],
          campaign_medium: args[:utm_medium],
          application_status: "Application Started"
        )

        if user.save
          login_as(account)

          {viewer: user}
        else
          ApiError.invalid_request("INVALID", user.errors.full_messages)
        end
      end
    end

    private

    def create_account(**args)
      account = Account.new(
        first_name: args[:first_name],
        last_name: args[:last_name],
        email: args[:email],
        permissions: [:team_manager]
      )

      return account if account.save

      ApiError.invalid_request("EMAIL_TAKEN", "Email already belongs to another account") if account.errors.added?(:email, "has already been taken")
      ApiError.invalid_request("FAILED_TO_CREATE_ACCOUNT")
    end
  end
end
