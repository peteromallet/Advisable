# frozen_string_literal: true

class RemoveDataFromGuildPosts < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :guild_posts, :data, :jsonb
    end
  end
end
