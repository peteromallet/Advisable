class AddPhoneNumberToSpecialists < ActiveRecord::Migration[5.2]
  def change
    add_column :specialists, :encrypted_phone_number, :string
    add_column :specialists, :encrypted_phone_number_iv, :string
  end
end
