# frozen_string_literal: true

class AddCoverPhotoToGuildPosts < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :guild_posts, :cover_photo, foreign_key: {to_table: :active_storage_attachments}
    end
  end
end
