class DropBookingRejectionReasons < ActiveRecord::Migration[6.0]
  def up
    safety_assured do
      remove_column :bookings, :rejection_reason_id, :bigint
      drop_table :booking_rejection_reasons
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration, "Can't recover droped table"
  end
end
