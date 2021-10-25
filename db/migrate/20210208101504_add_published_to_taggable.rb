# frozen_string_literal: true

class AddPublishedToTaggable < ActiveRecord::Migration[6.1]
  class MigrationTopic < ActiveRecord::Base
    self.table_name = :tags
  end

  def up
    add_column :tags, :published, :boolean, default: false

    MigrationTopic.find_each do |topic|
      topic.published = true
      topic.save(touch: false, validate: false)
    end
  end

  def down
    remove_column :tags, :published
  end
end
