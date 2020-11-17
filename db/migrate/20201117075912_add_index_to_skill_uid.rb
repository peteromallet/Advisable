class AddIndexToSkillUid < ActiveRecord::Migration[6.0]
  disable_ddl_transaction!

  def change
    add_index :skills, :uid, algorithm: :concurrently
    add_index :skills, :airtable_id, algorithm: :concurrently
  end
end
