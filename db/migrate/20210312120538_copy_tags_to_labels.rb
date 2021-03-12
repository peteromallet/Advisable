# frozen_string_literal: true

class CopyTagsToLabels < ActiveRecord::Migration[6.1]
  class MigrationTag < ApplicationRecord
    self.table_name = :tags
  end

  class MigrationTagging < ApplicationRecord
    self.table_name = :taggings
  end

  class MigrationLabel < ApplicationRecord
    self.table_name = :labels
  end

  class MigrationLabeling < ApplicationRecord
    self.table_name = :labelings
  end

  def up
    truncate_label_tables
    @migration_time = Time.zone.now
    migrate_tags
    create_id_mapping
    migrate_taggings
  end

  def down
    truncate_label_tables
  end

  private

  def truncate_label_tables
    MigrationLabeling.delete_all
    MigrationLabel.delete_all
  end

  def migrate_tags
    MigrationTag.find_in_batches do |batch|
      labels = batch.map do |t|
        published_at = t.published? ? @migration_time : nil
        hash = {
          name: t.name,
          slug: t.slug,
          published_at: published_at,
          labelings_count: t.taggings_count,
          country_id: nil,
          industry_id: nil,
          skill_id: nil,
          updated_at: @migration_time,
          created_at: @migration_time
        }
        hash["#{t.topicable_type.downcase}_id".to_sym] = t.topicable_id
        hash
      end

      MigrationLabel.insert_all(labels)
    end
  end

  def create_id_mapping
    tag_slugs = MigrationTag.pluck(:slug, :id)
    label_slugs = MigrationLabel.pluck(:slug, :id).to_h

    @mapping = tag_slugs.map do |slug, id|
      [id, label_slugs[slug]]
    end.to_h
  end

  def migrate_taggings
    MigrationTagging.find_in_batches do |batch|
      labelings = batch.map do |t|
        {
          label_id: @mapping[t.tag_id],
          guild_post_id: t.taggable_id,
          updated_at: @migration_time,
          created_at: @migration_time
        }
      end

      MigrationLabeling.insert_all(labelings)
    end
  end
end
