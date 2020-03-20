class AddTimestampsToTasksAndConsultations < ActiveRecord::Migration[6.0]
  def change
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
    add_column :consultations, :declined_at, :datetime
    add_column :consultations, :advisable_declined_at, :datetime
  end
end
