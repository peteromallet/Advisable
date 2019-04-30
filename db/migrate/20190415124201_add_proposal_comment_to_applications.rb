class AddProposalCommentToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :proposal_comment, :string
  end
end
