class AddIndexToGuildPostEngagements < ActiveRecord::Migration[6.0]
  disable_ddl_transaction!

  def change
    # Need to destroy the existing test data before we add the index
    Guild::PostEngagement.destroy_all
    add_index :guild_post_engagements, [:specialist_id, :guild_post_id], unique: true, algorithm: :concurrently
  end
end
