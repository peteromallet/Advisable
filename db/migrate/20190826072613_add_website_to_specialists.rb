class AddWebsiteToSpecialists < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :website, :string
  end
end
