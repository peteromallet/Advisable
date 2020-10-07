class CreateMagicLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :magic_links do |t|
      t.belongs_to :account, null: false
      t.string :path
      t.integer :uses_remaining
      t.string :digest
      t.datetime :expires_at

      t.timestamps
    end
  end
end
