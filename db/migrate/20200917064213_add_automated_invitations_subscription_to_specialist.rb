class AddAutomatedInvitationsSubscriptionToSpecialist < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :automated_invitations_subscription, :boolean
  end
end
