# frozen_string_literal: true

class RemoveTypeFromGuildPosts < ActiveRecord::Migration[7.0]
  def change
    safety_assured { remove_column :guild_posts, :type, :string }
  end
end
