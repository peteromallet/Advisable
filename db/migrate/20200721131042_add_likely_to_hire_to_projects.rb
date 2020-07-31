class AddLikelyToHireToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :likely_to_hire, :integer
  end
end
