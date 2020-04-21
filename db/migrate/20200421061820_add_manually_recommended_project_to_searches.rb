class AddManuallyRecommendedProjectToSearches < ActiveRecord::Migration[6.0]
  def change
    add_reference :searches,
                  :manually_recommended_project,
                  foreign_key: { to_table: :off_platform_projects }, null: true
  end
end
