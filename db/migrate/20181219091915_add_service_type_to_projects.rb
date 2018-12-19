class AddServiceTypeToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :service_type, :string
  end
end
