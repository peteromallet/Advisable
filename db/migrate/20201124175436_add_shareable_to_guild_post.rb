class AddShareableToGuildPost < ActiveRecord::Migration[6.0]
  def change
    add_column :guild_posts, :shareable, :boolean, default: false
  end
end
