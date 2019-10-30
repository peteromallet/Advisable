class AddCompanyTypeExperienceRequiredToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :company_type_experience_required, :boolean
  end
end
