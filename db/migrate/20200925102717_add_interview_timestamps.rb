class AddInterviewTimestamps < ActiveRecord::Migration[6.0]
  def change
    add_column :interviews, :call_requested_at, :datetime
    add_column :interviews, :call_scheduled_at, :datetime
    add_column :interviews, :requested_more_time_options_at, :datetime
    add_column :interviews, :more_time_options_added_at, :datetime
    add_column :interviews, :client_requested_reschedule_at, :datetime
    add_column :interviews, :specialist_requested_reschedule_at, :datetime
  end
end
