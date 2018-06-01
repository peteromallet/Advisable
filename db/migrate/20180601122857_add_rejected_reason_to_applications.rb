class AddRejectedReasonToApplications < ActiveRecord::Migration[5.2]
  def change
    add_reference :applications, :rejection_reason, foreign_key: true
  end
end
