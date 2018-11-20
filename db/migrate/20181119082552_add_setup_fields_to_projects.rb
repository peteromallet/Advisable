class AddSetupFieldsToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :status, :string
    add_column :projects, :company_description, :text
    add_column :projects, :description, :text
    add_column :projects, :specialist_description, :text
    add_column :projects, :goals, :text, array: true, default: []
    add_column :projects, :questions, :text, array: true, default: []
    add_column :projects, :required_characteristics, :text, array: true, default: []
    add_column :projects, :optional_characteristics, :text, array: true, default: []
    add_column :projects, :accepted_terms_at, :datetime
    add_column :projects, :deposit, :integer
  end
end
