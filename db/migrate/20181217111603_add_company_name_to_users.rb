class AddCompanyNameToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :company_name, :string
  end
end
