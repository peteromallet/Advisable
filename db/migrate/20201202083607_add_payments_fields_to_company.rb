class AddPaymentsFieldsToCompany < ActiveRecord::Migration[6.0]
  def change
    safety_assured do
      change_table :companies, bulk: true do |t|
        t.string :invoice_name
        t.string :invoice_company_name
        t.string :billing_email
        t.string :vat_number
        t.jsonb :address
      end
    end
  end
end
