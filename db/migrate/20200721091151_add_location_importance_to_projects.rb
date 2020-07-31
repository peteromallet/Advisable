class AddLocationImportanceToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :location_importance, :integer
  end
end
