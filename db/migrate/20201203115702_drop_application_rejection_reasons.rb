class DropApplicationRejectionReasons < ActiveRecord::Migration[6.0]
  def up
    safety_assured do
      remove_column :applications, :rejection_reason_id, :bigint
      drop_table :application_rejection_reasons
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration, "Can't recover droped table"
  end
end
