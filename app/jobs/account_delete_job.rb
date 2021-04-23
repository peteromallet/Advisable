# frozen_string_literal: true

class AccountDeleteJob < ApplicationJob
  queue_as :default

  DELETION_PERIOD = 14.days

  def perform
    accounts_to_delete = Account.where("deleted_at < ?", DELETION_PERIOD.ago)
    purge_twilio_messages!(Specialist.where(account: accounts_to_delete))
    accounts_to_delete.destroy_all
  end

  private

  def purge_twilio_messages!(specialists)
    chat = TwilioChat::Client.new
    specialists.each do |specialist|
      chat.purge_messages!(specialist.uid)
    end
  end
end
