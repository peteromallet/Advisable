class AddUidToSkills < ActiveRecord::Migration[5.2]
  def up
    add_column :skills, :uid, :string, index: true
  end

  def down
    remove_column :skills, :uid, :string, index: true
  end
end
