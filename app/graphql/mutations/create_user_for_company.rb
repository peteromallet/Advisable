# frozen_string_literal: true

module Mutations
  class CreateUserForCompany < Mutations::BaseMutation
    description "Creates User for a Company"

    include Mutations::Helpers::BlacklistedEmail

    argument :email, String, required: true
    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :team_manager, Boolean, required: false

    field :user, Types::User, null: true
    field :company, Types::CompanyType, null: true

    def authorized?(**_args)
      requires_team_manager!
    end

    def resolve(email:, **optional)
      email_blank?(email)
      email_blacklisted?(email)
      email_matches_domain?(email)
      attributes = optional.slice(:first_name, :last_name)
      attributes[:permissions] = optional[:team_manager] ? [:team_manager] : []
      account = Account.new(email: email, **attributes)
      account.features = current_user.account.features
      account.save!

      new_user = current_user.invite_comember!(account, responsible: current_account_id)
      UserMailer.invited_by_manager(current_user, new_user).deliver_later

      {user: new_user, company: current_company}
    rescue ActiveRecord::RecordInvalid
      return ApiError.invalid_request("EMAIL_TAKEN", "The email #{email} is already used by another account.") if account.errors.added?(:email, :taken, value: email)

      raise
    end

    private

    def email_blank?(email)
      ApiError.invalid_request("EMAIL_BLANK", "Email is required.") if email.blank?
    end

    def email_matches_domain?(email)
      user_domain = current_user.account.domain
      email_domain = email.split("@").last
      return if user_domain == email_domain

      ApiError.invalid_request("DOMAIN_MISMATCH", "The domain #{email_domain} does not match #{user_domain}", extensions: {
        userDomain: user_domain,
        emailDomain: email_domain
      })
    end
  end
end
