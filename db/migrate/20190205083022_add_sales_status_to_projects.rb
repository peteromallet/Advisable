class AddSalesStatusToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :sales_status, :string
  end
end
