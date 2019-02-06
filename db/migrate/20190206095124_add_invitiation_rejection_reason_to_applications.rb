class AddInvitiationRejectionReasonToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :invitation_rejection_reason, :string
  end
end
