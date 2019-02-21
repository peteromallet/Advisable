class AddUidToSpecialists < ActiveRecord::Migration[5.2]
  def change
    add_column :specialists, :uid, :string, index: true
  end
end
