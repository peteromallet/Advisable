class AddBioToSpecialists < ActiveRecord::Migration[5.2]
  def change
    add_column :specialists, :bio, :text
  end
end
