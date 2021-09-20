# frozen_string_literal: true

class AddPostAndMetadataToMessage < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :messages, :guild_post, foreign_key: {to_table: :guild_posts}, type: :uuid
      add_column :messages, :metadata, :jsonb
    end
  end
end
