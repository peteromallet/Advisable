class AddPaymentIntentToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :deposit_payment_intent_id, :string
  end
end
