class AddValidationFailedReasonToOffPlatformProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :off_platform_projects, :validation_failed_reason, :string
  end
end
