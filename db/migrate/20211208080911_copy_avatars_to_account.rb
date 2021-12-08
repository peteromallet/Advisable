# frozen_string_literal: true

class MigrationAttachment < ActiveRecord::Base
  self.table_name = :active_storage_attachments
end

class MigrationUser < ActiveRecord::Base
  self.table_name = :users
end

class MigrationSpecialist < ActiveRecord::Base
  self.table_name = :specialists
end

class CopyAvatarsToAccount < ActiveRecord::Migration[6.1]
  def up
    migrate_avatars_to_account_for("User")
    migrate_avatars_to_account_for("Specialist")
  end

  private

  def migrate_avatars_to_account_for(klass)
    avatars = MigrationAttachment.where(record_type: klass, name: "avatar")
    ids = "Migration#{klass}".constantize.where(id: avatars.pluck(:record_id)).pluck(:id, :account_id).to_h
    avatars.each do |avatar|
      MigrationAttachment.create!(
        avatar.attributes.except("id").merge(
          "record_type" => "Account",
          "record_id" => ids[avatar.record_id]
        )
      )
    end
  end
end
