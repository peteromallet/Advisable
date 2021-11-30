# frozen_string_literal: true

class RemoveReactionableCountFromGuildPosts < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :guild_posts, :reactionable_count, :integer
    end
  end
end
