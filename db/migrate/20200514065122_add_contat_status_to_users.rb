class AddContatStatusToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :contact_status, :string
  end
end
