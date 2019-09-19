class AddIndustryToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :industry, :string
  end
end
