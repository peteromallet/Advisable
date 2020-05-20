class AddReviewedByToOffPlatformProjects < ActiveRecord::Migration[6.0]
  def change
    add_reference :off_platform_projects, :reviewed_by, null: true
  end
end
