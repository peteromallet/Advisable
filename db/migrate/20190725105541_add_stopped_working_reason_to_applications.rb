class AddStoppedWorkingReasonToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :stopped_working_reason, :string
  end
end
