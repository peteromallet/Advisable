class CreatePayments < ActiveRecord::Migration[5.2]
  def change
    create_table :payments do |t|
      t.string :uid, index: true
      t.string :source_id, index: true
      t.string :charge_id, index: true
      t.string :amount
      t.string :currency
      t.string :status
      t.string :error_code
      t.belongs_to :project, foreign_key: true

      t.timestamps
    end
  end
end
