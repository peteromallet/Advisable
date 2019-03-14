class AddValidationExplanationToOffPlatformProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :off_platform_projects, :validation_explanation, :string
  end
end
