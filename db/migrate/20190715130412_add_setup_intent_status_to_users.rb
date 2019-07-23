class AddSetupIntentStatusToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :setup_intent_status, :string
  end
end
