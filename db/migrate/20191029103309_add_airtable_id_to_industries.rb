class AddAirtableIdToIndustries < ActiveRecord::Migration[6.0]
  def change
    add_column :industries, :airtable_id, :string, index: true
  end
end
