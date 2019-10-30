class CreateClientCalls < ActiveRecord::Migration[6.0]
  def change
    create_table :client_calls do |t|
      t.string :airtable_id, index: true
      t.integer :duration
      t.belongs_to :project, null: false, foreign_key: true
      t.datetime :call_time
      t.string :phone_number
      t.string :email
      t.string :event_type
      t.string :calendly_id
      t.boolean :cancelled
      t.belongs_to :sales_person, null: false, foreign_key: true
      t.string :type_of_call
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
