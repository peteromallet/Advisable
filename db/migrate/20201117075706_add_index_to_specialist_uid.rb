class AddIndexToSpecialistUid < ActiveRecord::Migration[6.0]
  disable_ddl_transaction!

  def change
    add_index :specialists, :uid, algorithm: :concurrently
    add_index :specialists, :airtable_id, algorithm: :concurrently
  end
end
