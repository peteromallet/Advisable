class AddEngagementsCounterToGuildPosts < ActiveRecord::Migration[6.0]
  def change
    add_column :guild_posts, :engagements_count, :integer, default: 0
  end
end
