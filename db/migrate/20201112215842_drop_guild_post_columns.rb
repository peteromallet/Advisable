class DropGuildPostColumns < ActiveRecord::Migration[6.0]
  def change
    safety_assured do
      remove_column :guild_posts, :body_raw, :text
      remove_column :guild_posts, :audience, :integer
      remove_column :guild_posts, :commentable, :boolean
      remove_column :guild_posts, :reactionable, :boolean
    end
  end
end
