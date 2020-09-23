class AddGuildDataToSpecialists < ActiveRecord::Migration[6.0]
  def change
    remove_column :specialists, :guild_joined_date
    add_column :specialists, :guild_data, :jsonb
  end
end
