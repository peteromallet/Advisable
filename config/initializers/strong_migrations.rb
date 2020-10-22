StrongMigrations.start_after = 20201010000000
ActiveRecord::Base.dump_schema_after_migration = Rails.env.development? && `git status db/migrate/ --porcelain`.present?
