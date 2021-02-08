# frozen_string_literal: true

class AddResolvedAtToGuildPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :guild_posts, :resolved_at, :datetime
  end
end
