# frozen_string_literal: true

class AccountDeleteJob < ApplicationJob
  queue_as :default

  DELETION_PERIOD = 14.days

  def perform
    accounts_to_delete = Account.where("deleted_at < ?", DELETION_PERIOD.ago)
    ::Analytics.new.suppress_and_delete(accounts_to_delete.map(&:uid))
    accounts_to_delete.destroy_all
  end
end
