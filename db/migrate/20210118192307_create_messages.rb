class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages, id: :uuid do |t|
      t.belongs_to :conversation, null: false, foreign_key: true, type: :uuid
      t.belongs_to :account, null: false, foreign_key: true
      t.string :content

      t.timestamps
    end
  end
end
