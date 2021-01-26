class AddBoostedAtToGuildPosts < ActiveRecord::Migration[6.0]
  def change
    add_column :guild_posts, :boosted_at, :datetime
  end
end
