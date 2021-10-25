# frozen_string_literal: true

class CopyAudienceTypeFromDataToColumn < ActiveRecord::Migration[6.1]
  class MigrationPost < ActiveRecord::Base
    self.table_name = :guild_posts
    self.inheritance_column = :dont_care_about_type
  end

  def up
    MigrationPost.pluck(:id, :data).each do |id, data|
      data = data.presence || {}
      MigrationPost.find(id).update_columns(audience_type: data["audience_type"])
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
