class AddFidToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :fid, :string
  end
end
