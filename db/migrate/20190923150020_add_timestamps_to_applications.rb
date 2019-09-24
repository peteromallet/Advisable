class AddTimestampsToApplications < ActiveRecord::Migration[6.0]
  def change
    add_column :applications, :invited_to_apply_at, :datetime
    add_column :applications, :invitation_rejected_at, :datetime
    add_column :applications, :application_rejected_at, :datetime
    add_column :applications, :application_accepted_at, :datetime
    add_column :applications, :interview_scheduled_at, :datetime
    add_column :applications, :interview_completed_at, :datetime
    add_column :applications, :proposal_sent_at, :datetime
    add_column :applications, :started_working_at, :datetime
    add_column :applications, :stopped_working_at, :datetime
  end
end
