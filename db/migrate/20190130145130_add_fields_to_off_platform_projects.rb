class AddFieldsToOffPlatformProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :off_platform_projects, :can_contact, :boolean
    add_column :off_platform_projects, :validation_url, :string
    add_column :off_platform_projects, :contact_email, :string
  end
end
