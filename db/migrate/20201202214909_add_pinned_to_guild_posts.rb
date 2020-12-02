class AddPinnedToGuildPosts < ActiveRecord::Migration[6.0]
  def change
    add_column :guild_posts, :pinned, :boolean, default: false
  end
end
