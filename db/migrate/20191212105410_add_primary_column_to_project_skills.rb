class AddPrimaryColumnToProjectSkills < ActiveRecord::Migration[6.0]
  def change
    add_column :project_skills, :primary, :boolean
  end
end
