# frozen_string_literal: true

module Toby
  class LazyAccount
    attr_reader :account_id

    def initialize(context, account_id)
      # Initialize the loading state for this query,
      # or get the previously-initiated state
      @lazy_state = context[:lazy_find_account] ||= {
        pending_ids: Set.new,
        loaded_ids: {}
      }
      # Register this ID to be loaded later:
      @account_id = account_id
      @lazy_state[:pending_ids] << account_id
    end

    def account
      # Check if the record was already loaded:
      loaded_record = @lazy_state[:loaded_ids][account_id]
      if loaded_record
        # The pending IDs were already loaded,
        # so return the result of that previous load
        loaded_record
      else
        # The record hasn't been loaded yet, so
        # hit the database with all pending IDs
        pending_ids = @lazy_state[:pending_ids].to_a
        accounts = Account.where(id: pending_ids)
        accounts.each { |person| @lazy_state[:loaded_ids][person.id] = person }
        @lazy_state[:pending_ids].clear
        # Now, get the matching person from the loaded result:
        @lazy_state[:loaded_ids][account_id]
      end
    end
  end
end
