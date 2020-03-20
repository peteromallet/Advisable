class AddTimestampsToTasksAndConsultations < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :to_be_invited_at, :datetime
    add_column :tasks, :quote_requested_at, :datetime
    add_column :tasks, :quote_provided_at, :datetime
    add_column :tasks, :assigned_at, :datetime
    add_column :tasks, :started_working_at, :datetime
    add_column :tasks, :submitted_at, :datetime
    add_column :tasks, :approved_at, :datetime

    add_column :consultations, :request_started_at, :datetime
    add_column :consultations, :request_completed_at, :datetime
    add_column :consultations, :sent_at, :datetime
    add_column :consultations, :accepted_at, :datetime
    add_column :consultations, :rejected_at, :datetime
    add_column :consultations, :advisable_rejected_at, :datetime
  end
end
