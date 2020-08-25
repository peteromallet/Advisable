class AddGuildToSpecialists < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :guild, :boolean, default: false
  end
end
