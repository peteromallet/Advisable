# frozen_string_literal: true

# requires :participants and :accounts to exist on class
module Participants
  extend ActiveSupport::Concern

  def specialist_and_user?
    !!(accounts.size == 2 && accounts.any?(&:specialist) && accounts.any?(&:user))
  end

  class_methods do
    def by_accounts(*accounts, &)
      account_ids = Account.ids_from(accounts)
      find_existing_with(account_ids) || create_new_with(account_ids, &)
    end

    def find_existing_with(*accounts)
      account_ids = Account.ids_from(accounts).sort
      object_ids = joins(:participants).where(participants: {account_id: account_ids}).distinct.pluck(:id)
      reflection = reflections["participants"]
      id = reflection.klass.
        where(reflection.foreign_key => object_ids).
        pluck(reflection.foreign_key, :account_id).
        each_with_object({}) { |(o_id, acc_id), group| (group[o_id] ||= []) << acc_id }.
        find { |_, acc_ids| acc_ids.sort == account_ids }&.first
      find_by(id:)
    end

    def create_new_with(*accounts, &block)
      account_ids = Account.ids_from(accounts)
      object = new(account_ids:)
      yield(object) if block
      object.save!
      object
    end
  end
end
