class AddRejectionReasonToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :rejection_reason, :text
  end
end
