class AddDatesToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :start_date, :date
    add_column :bookings, :end_date, :date
  end
end
