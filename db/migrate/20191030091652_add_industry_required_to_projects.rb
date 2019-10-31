class AddIndustryRequiredToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :industry_experience_required, :boolean
  end
end
