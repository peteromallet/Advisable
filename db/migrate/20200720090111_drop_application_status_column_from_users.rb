class DropApplicationStatusColumnFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :application_status, :string
  end
end
