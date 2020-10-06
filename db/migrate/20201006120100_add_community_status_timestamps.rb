class AddCommunityStatusTimestamps < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :community_applied_at, :datetime
    add_column :specialists, :community_accepted_at, :datetime
    add_column :specialists, :community_invited_to_call_at, :datetime
    add_column :specialists, :community_score, :integer
  end
end
