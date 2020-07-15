class AddApplicationStatusToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :application_status, :string
  end
end
