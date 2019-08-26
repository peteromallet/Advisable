class AddPublicUseToSpecialists < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :public_use, :boolean
  end
end
