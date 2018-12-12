class AddUidToSkills < ActiveRecord::Migration[5.2]
  def change
    add_column :skills, :uid, :string, index: true
  end
end
