# frozen_string_literal: true

class CopySpecialistGuildDataToColumns < ActiveRecord::Migration[6.1]
  class MigrationSpecialist < ActiveRecord::Base
    self.table_name = :specialists
  end

  def up
    MigrationSpecialist.pluck(:id, :guild_data).each do |id, data|
      data = data.presence || {}
      MigrationSpecialist.find(id).update_columns(
        guild_joined_date: data["guild_joined_date"],
        guild_calendly_link: data["guild_calendly_link"],
        guild_featured_member_at: data["guild_featured_member_at"]
      )
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
