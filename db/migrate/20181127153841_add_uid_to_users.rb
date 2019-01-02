class AddUidToUsers < ActiveRecord::Migration[5.2]
  def up
    add_column :users, :uid, :string, index: true
  end

  def down
    remove_column :users, :uid, :string, index: true
  end
end
