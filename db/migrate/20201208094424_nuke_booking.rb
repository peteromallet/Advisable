class NukeBooking < ActiveRecord::Migration[6.0]
  def up
    safety_assured do
      drop_table :bookings
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration, "Can't recover droped table"
  end
end
