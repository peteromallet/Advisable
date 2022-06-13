# frozen_string_literal: true

class AddPostToNotification < ActiveRecord::Migration[7.0]
  def change
    add_reference :notifications, :guild_post, foreign_key: {to_table: :guild_posts}, type: :uuid
    change_column_null :notifications, :notifiable_type, true
    change_column_null :notifications, :notifiable_id, true
  end
end
