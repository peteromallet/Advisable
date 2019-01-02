class AddPermissionsToUserspermissions < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :permissions, :text, array: true, default: []
  end
end
