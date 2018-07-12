class AddRejectionReasonToBookings < ActiveRecord::Migration[5.2]
  def change
    add_reference :bookings, :rejection_reason
    remove_column :bookings, :decline_reason
  end
end
