class AddProposalCommentToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :proposal_comment, :string
  end
end
