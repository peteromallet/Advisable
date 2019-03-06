class AddUidToCountry < ActiveRecord::Migration[5.2]
  def change
    add_column :countries, :uid, :string, index: true
  end
end
