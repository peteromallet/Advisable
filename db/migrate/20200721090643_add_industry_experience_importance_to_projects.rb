class AddIndustryExperienceImportanceToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :industry_experience_importance, :integer
  end
end
