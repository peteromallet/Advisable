class AddSalesPersonToProjects < ActiveRecord::Migration[6.0]
  def change
    add_reference :projects, :sales_person, null: true, foreign_key: true
  end
end
