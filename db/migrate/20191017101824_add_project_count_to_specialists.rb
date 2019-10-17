class AddProjectCountToSpecialists < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :project_count, :int
  end
end
