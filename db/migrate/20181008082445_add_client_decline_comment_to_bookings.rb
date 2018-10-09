class AddClientDeclineCommentToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :client_decline_comment, :string
  end
end
