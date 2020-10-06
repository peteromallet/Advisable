class CreateAuthProviders < ActiveRecord::Migration[6.0]
  def change
    create_table :auth_providers do |t|
      t.string :uid
      t.string :provider
      t.string :token
      t.string :refresh_token
      t.datetime :expires_at
      t.references :user, null: false, foreign_key: true
      t.jsonb :blob

      t.timestamps
    end

    add_index :auth_providers, [:provider, :uid], unique: true
  end
end
