class AddPaymentsSetupToCompany < ActiveRecord::Migration[6.0]
  def change
    safety_assured do
      change_table :companies, bulk: true do |t|
        t.boolean :payments_setup, default: false
        t.string :project_payment_method
        t.datetime :accepted_project_payment_terms_at
      end
    end
  end
end
