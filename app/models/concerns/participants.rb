# frozen_string_literal: true

# requires :participants and :accounts to exist on class
module Participants
  extend ActiveSupport::Concern

  # returns an array of accounts that are participants in the conversation
  # works with CollectionProxy regardless if the main record is persisted or not
  def account_records
    accounts.records
  end

  def specialist_and_user?
    !!(account_records.size == 2 && specialist && user)
  end

  def guests
    account_records - [requested_by]
  end

  def specialist
    Specialist.find_by(account: account_records)
  end

  def user
    User.find_by(account: account_records)
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
