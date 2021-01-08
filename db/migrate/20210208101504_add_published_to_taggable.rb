# frozen_string_literal: true

class AddPublishedToTaggable < ActiveRecord::Migration[6.1]
  def up
    add_column ActsAsTaggableOn.tags_table, :published, :boolean, default: false

    Guild::Topic.find_each do |topic|
      topic.published = true
      topic.save(touch: false, validate: false)
    end
  end

  def down
    remove_column ActsAsTaggableOn.tags_table, :published
  end
end
