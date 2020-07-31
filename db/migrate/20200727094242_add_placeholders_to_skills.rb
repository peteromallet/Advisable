class AddPlaceholdersToSkills < ActiveRecord::Migration[6.0]
  def change
    add_column :skills, :characteristic_placeholder, :string
    add_column :skills, :goal_placeholder, :string
  end
end
