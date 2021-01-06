# frozen_string_literal: true

class AccountDeleteJob < ApplicationJob
  queue_as :default

  DELETION_PERIOD = 14.days

  def perform
    Account.where("deleted_at < ?", DELETION_PERIOD.ago).destroy_all
  end
end
