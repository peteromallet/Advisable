class AddPhoneToSpecialists < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :phone, :string
  end
end
