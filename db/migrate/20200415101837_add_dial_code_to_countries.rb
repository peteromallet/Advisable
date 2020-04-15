class AddDialCodeToCountries < ActiveRecord::Migration[6.0]
  def change
    add_column :countries, :dial_in_number, :string
  end
end
