class AddCompanyTypeToOffPlatformProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :off_platform_projects, :company_type, :string
  end
end
