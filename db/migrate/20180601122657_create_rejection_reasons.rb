class CreateRejectionReasons < ActiveRecord::Migration[5.2]
  def change
    create_table :rejection_reasons do |t|
      t.string :reason
      t.string :airtable_id, index: true

      t.timestamps
    end
  end
end
