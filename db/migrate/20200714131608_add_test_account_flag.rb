class AddTestAccountFlag < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :test_account, :boolean
    add_column :users, :test_account, :boolean
  end
end
