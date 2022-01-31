# frozen_string_literal: true

module Mutations
  class ManageSubscription < Mutations::BaseMutation
    argument :action, String, required: true
    argument :subscription, String, required: true

    field :account, Types::Account, null: true

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(subscription:, action:)
      account = current_user.account
      unsubscribed_from = account.unsubscribed_from

      case action
      when "subscribe"
        unsubscribed_from -= [subscription]
      when "unsubscribe"
        unsubscribed_from += [subscription]
      else
        ApiError.invalid_request("INVALID SUBSRIPTION ACTION")
      end

      current_account_responsible_for do
        account.update!(unsubscribed_from: unsubscribed_from.uniq)
      end

      {account:}
    end
  end
end
