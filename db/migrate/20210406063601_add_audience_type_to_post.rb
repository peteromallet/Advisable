# frozen_string_literal: true

class AddAudienceTypeToPost < ActiveRecord::Migration[6.1]
  def change
    add_column :guild_posts, :audience_type, :string
  end
end
