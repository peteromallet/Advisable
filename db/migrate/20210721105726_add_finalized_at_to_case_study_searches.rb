class AddFinalizedAtToCaseStudySearches < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_searches, :finalized_at, :datetime
  end
end
