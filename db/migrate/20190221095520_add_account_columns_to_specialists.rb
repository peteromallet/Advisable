class AddAccountColumnsToSpecialists < ActiveRecord::Migration[5.2]
  def change
    add_column :specialists, :email, :string, index: true
    add_column :specialists, :password_digest, :string
    add_column :specialists, :confirmed_at, :datetime
    add_column :specialists, :confirmation_digest, :string
    add_column :specialists, :reset_sent_at, :datetime
    add_column :specialists, :reset_digest, :string
    add_column :specialists, :permissions, :text, array: true, default: []
  end
end
