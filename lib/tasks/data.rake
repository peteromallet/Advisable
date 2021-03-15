# frozen_string_literal: true

require_relative "../../app/models/application_record"

class MigrationTag < ApplicationRecord
  self.table_name = :tags
end

class MigrationTagging < ApplicationRecord
  self.table_name = :taggings
end

class TagsMigration
  def migrate
    migrate_tags
    create_id_mapping
    migrate_taggings
    migrate_subscriptions
  end

  private

  def migrate_tags
    p "Migrating tags"
    MigrationTag.find_in_batches do |batch|
      labels = batch.map do |t|
        published_at = t.published ? t.created_at : nil
        hash = {
          name: t.name,
          slug: t.slug,
          published_at: published_at,
          labelings_count: t.taggings_count,
          country_id: nil,
          industry_id: nil,
          skill_id: nil,
          updated_at: t.updated_at,
          created_at: t.created_at
        }
        hash["#{t.topicable_type.downcase}_id".to_sym] = t.topicable_id
        hash
      end

      Label.upsert_all(labels, unique_by: :index_labels_on_slug)
    end
  end

  def create_id_mapping
    p "Creating mapping"

    tag_slugs = MigrationTag.pluck(:slug, :id)
    label_slugs = Label.pluck(:slug, :id).to_h

    @mapping = tag_slugs.map do |slug, id|
      [id, label_slugs[slug]]
    end.to_h
  end

  def migrate_taggings
    p "Migrating taggings"

    MigrationTagging.find_in_batches do |batch|
      labelings = batch.map do |t|
        {
          label_id: @mapping[t.tag_id],
          guild_post_id: t.taggable_id,
          updated_at: t.created_at,
          created_at: t.created_at
        }
      end

      Labeling.upsert_all(labelings, unique_by: :index_labelings_on_label_id_and_guild_post_id)
    end
  end

  def migrate_subscriptions
    p "Migrating subscriptions"

    Subscription.on_tag.find_in_batches do |batch|
      subscriptions = batch.map do |s|
        {
          specialist_id: s.specialist_id,
          label_id: @mapping[s.tag_id],
          updated_at: s.updated_at,
          created_at: s.created_at
        }
      end

      Subscription.upsert_all(subscriptions, unique_by: :index_subscriptions_on_specialist_id_and_label_id)
    end
  end
end

namespace :data do
  task industries: :environment do
    industries_file = Rails.root.join('lib', 'tasks', 'data', 'industries.txt')
    industries = File.readlines(industries_file).map(&:strip)
    industries.each { |name| Industry.create(name: name) }
  end

  task blacklisted_domains: :environment do
    file = Rails.root.join('lib', 'tasks', 'data', 'blacklisted_domains.txt')
    domains = File.readlines(file).map(&:strip)
    domains.each { |domain| BlacklistedDomain.create(domain: domain) }
  end

  task migrate_project_counts: :environment do
    projects =
      Project.joins(:applications).where(
        applications: {
          status: [
            (
              Application::ACTIVE_STATUSES + %w[Proposed] +
                Application::HIRED_STATUSES
            )
          ]
        }
      )

    projects.find_each(&:update_application_counts)
  end

  task migrate_tags: :environment do
    TagsMigration.new.migrate
  end
end
