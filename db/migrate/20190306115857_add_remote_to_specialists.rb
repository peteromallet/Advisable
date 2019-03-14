class AddRemoteToSpecialists < ActiveRecord::Migration[5.2]
  def change
    add_column :specialists, :remote, :boolean
  end
end
