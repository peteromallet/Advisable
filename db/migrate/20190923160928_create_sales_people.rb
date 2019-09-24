class CreateSalesPeople < ActiveRecord::Migration[6.0]
  def change
    create_table :sales_people do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :username
      t.boolean :active
      t.boolean :out_of_office
      t.string :slack
      t.string :calendly_url
      t.string :asana_id
      t.string :airtable_id

      t.timestamps
    end
  end
end
