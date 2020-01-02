class AddContactRelationshipToOffPlatformProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :off_platform_projects, :contact_relationship, :string
  end
end
