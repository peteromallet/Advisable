class CreateClients < ActiveRecord::Migration[5.2]
  def change
    create_table :clients do |t|
      t.string :name
      t.string :airtable_id, index: true

      t.timestamps
    end
  end
end
