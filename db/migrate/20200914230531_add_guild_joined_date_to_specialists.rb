class AddGuildJoinedDateToSpecialists < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :guild_joined_date, :datetime
  end
end
