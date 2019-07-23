class AddUidToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :uid, :string, index: true
  end
end
