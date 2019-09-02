class AddActiveToSkills < ActiveRecord::Migration[6.0]
  def change
    add_column :skills, :active, :boolean
  end
end
