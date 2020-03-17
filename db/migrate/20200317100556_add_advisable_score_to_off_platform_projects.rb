class AddAdvisableScoreToOffPlatformProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :off_platform_projects, :advisable_score, :integer
  end
end
