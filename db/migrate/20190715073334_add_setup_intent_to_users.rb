class AddSetupIntentToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :stripe_setup_intent_id, :string
  end
end
