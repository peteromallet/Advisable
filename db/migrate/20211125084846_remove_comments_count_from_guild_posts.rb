# frozen_string_literal: true

class RemoveCommentsCountFromGuildPosts < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :guild_posts, :comments_count, :integer
    end
  end
end
