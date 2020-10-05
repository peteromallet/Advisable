class CreateAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :accounts do |t|
      t.string :first_name
      t.string :last_name
      t.string :password_digest
      t.string :email
      t.string :uid
      t.datetime :confirmed_at
      t.string :confirmation_digest
      t.references :country, foreign_key: true
      t.string :reset_digest
      t.datetime :reset_sent_at
      t.jsonb :permissions, default: []
      t.jsonb :completed_tutorials, default: []
      t.string :vat_number
      t.string :confirmation_token
      t.string :campaign_name
      t.string :campaign_source
      t.boolean :test_account
      t.string :remember_token

      t.timestamps
    end
    add_index :accounts, :email
    add_index :accounts, :uid, unique: true
  end
end
