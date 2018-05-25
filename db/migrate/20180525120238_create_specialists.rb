class CreateSpecialists < ActiveRecord::Migration[5.2]
  def change
    create_table :specialists do |t|
      t.string :first_name
      t.string :last_name
      t.jsonb :image
      t.string :linkedin
      t.string :travel_availability
      t.string :city
      t.belongs_to :country, foreign_key: true
      t.string :airtable_id

      t.timestamps
    end
  end
end
