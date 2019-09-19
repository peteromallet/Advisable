class AddCompanyToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :company_type, :string
  end
end
