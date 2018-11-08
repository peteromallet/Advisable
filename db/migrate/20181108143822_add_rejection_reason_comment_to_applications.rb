class AddRejectionReasonCommentToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :rejection_reason_comment, :text
  end
end
