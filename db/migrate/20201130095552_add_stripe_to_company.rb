class AddStripeToCompany < ActiveRecord::Migration[6.0]
  def change
    safety_assured do
      change_table :companies, bulk: true do |t|
        t.string :stripe_customer_id
        t.string :stripe_setup_intent_id
        t.string :setup_intent_status
      end
    end
  end
end
