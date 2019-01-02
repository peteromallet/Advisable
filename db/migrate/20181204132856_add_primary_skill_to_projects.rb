class AddPrimarySkillToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :primary_skill, :string
  end
end
