# frozen_string_literal: true

class RemoveAutomatedInvitationsSubscriptionToSpecialist < ActiveRecord::Migration[6.1]
  def change
    safety_assured { remove_column :specialists, :automated_invitations_subscription, :boolean }
  end
end
