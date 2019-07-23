class AddInvoiceSettingsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :invoice_name, :string
    add_column :users, :invoice_company_name, :string
    add_column :users, :vat_number, :string
    add_column :users, :address, :jsonb
  end
end
