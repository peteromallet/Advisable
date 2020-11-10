class DropColumnsFromSpecialistAndUser < ActiveRecord::Migration[6.0]
  def change
    safety_assured do
      remove_column :specialists, :email, :string
      remove_column :specialists, :password_digest, :string
      remove_column :specialists, :remember_token, :string
      remove_column :specialists, :confirmed_at, :datetime
      remove_column :specialists, :confirmation_digest, :string
      remove_column :specialists, :confirmation_token, :string
      remove_column :specialists, :reset_digest, :string
      remove_column :specialists, :reset_sent_at, :datetime
      remove_column :specialists, :test_account, :boolean
      remove_column :specialists, :vat_number, :string
      remove_column :specialists, :permissions, :jsonb
      remove_column :specialists, :completed_tutorials, :jsonb
      remove_column :specialists, :first_name, :string
      remove_column :specialists, :last_name, :string

      remove_column :users, :email, :string
      remove_column :users, :password_digest, :string
      remove_column :users, :remember_token, :string
      remove_column :users, :confirmed_at, :datetime
      remove_column :users, :confirmation_digest, :string
      remove_column :users, :confirmation_token, :string
      remove_column :users, :reset_digest, :string
      remove_column :users, :reset_sent_at, :datetime
      remove_column :users, :test_account, :boolean
      remove_column :users, :vat_number, :string
      remove_column :users, :permissions, :jsonb
      remove_column :users, :completed_tutorials, :jsonb
      remove_column :users, :first_name, :string
      remove_column :users, :last_name, :string
    end
  end
end
