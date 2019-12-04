class AddProjectsCountToSkills < ActiveRecord::Migration[6.0]
  def change
    add_column :skills, :projects_count, :int, default: 0
  end
end
