# frozen_string_literal: true

class DropCoverPhotoForeignKeyFromOffPlatformProjects < ActiveRecord::Migration[6.1]
  def up
    remove_foreign_key :off_platform_projects, column: :cover_photo_id
    remove_index :off_platform_projects, column: :cover_photo_id
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
