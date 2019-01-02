class AddUidToUsers < ActiveRecord::Migration[5.2]
  def up
    add_column :users, :uid, :string, index: true

    User.all.each do |u|
      u.generate_uid
      u.save
    end
  end

  def down
    remove_column :users, :uid, :string, index: true
  end
end
