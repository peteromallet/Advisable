# frozen_string_literal: true

class MigrateFollowsToSubscriptions < ActiveRecord::Migration[6.1]
  class MigrationFollow < ActiveRecord::Base
    self.table_name = :follows
  end

  class MigrationSubscription < ActiveRecord::Base
    self.table_name = :subscriptions
  end

  def up
    migration_time = Time.zone.now
    MigrationFollow.find_in_batches do |batch|
      subs = batch.map do |f|
        {
          specialist_id: f.follower_id,
          tag_id: f.followable_id,
          updated_at: migration_time,
          created_at: migration_time
        }
      end

      MigrationSubscription.upsert_all(subs, unique_by: :index_subscriptions_on_specialist_id_and_tag_id)
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
