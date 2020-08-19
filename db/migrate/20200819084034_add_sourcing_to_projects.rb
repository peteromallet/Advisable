class AddSourcingToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :sourcing, :boolean
  end
end
