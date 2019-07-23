class AddBankDetailsToSpecialists < ActiveRecord::Migration[5.2]
  def change
    add_column :specialists, :bank_holder_name, :string
    add_column :specialists, :bank_holder_address, :jsonb, default: {}
    add_column :specialists, :bank_currency, :string
    add_column :specialists, :vat_number, :string
  end
end
