class AddCategoryToSkills < ActiveRecord::Migration[5.2]
  def change
    add_column :skills, :category, :string
    add_column :skills, :profile, :boolean
  end
end
