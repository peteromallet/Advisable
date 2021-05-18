# frozen_string_literal: true

module Mutations
  module Helpers
    module Account # rubocop:disable GraphQL/ObjectDescription
      include Mutations::Helpers::BlacklistedEmail

      def find_or_create_user_by_email!(email, attributes = {})
        existing_acc = ::Account.find_by(email: email)
        if existing_acc
          ApiError.invalid_request("notAnUser", "This email belongs to a specialist account") if existing_acc.user.nil?

          existing_acc.user
        else
          email_blacklisted?(email)
          attributes = attributes.slice(:first_name, :last_name)
          account = ::Account.new(email: email, **attributes)
          account.save!
          current_user.invite_comember!(account, responsible: current_account_id)
        end
      rescue ActiveRecord::RecordInvalid
        raise ApiError::InvalidRequest.new("emailBlank", "Email is required.") if account.errors.added?(:email, :blank)

        raise
      end
    end
  end
end
