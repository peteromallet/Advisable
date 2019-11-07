class AddCompanyTypeToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :company_type, :string
  end
end
