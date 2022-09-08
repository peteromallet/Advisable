# frozen_string_literal: true

class RemoveMoreTimeOptionsAddedAtFromInterviews < ActiveRecord::Migration[7.0]
  def change
    remove_column :interviews, :more_time_options_added_at, :datetime
    remove_column :interviews, :requested_more_time_options_at, :datetime
    remove_column :interviews, :specialist_requested_reschedule_at, :datetime
    remove_column :interviews, :client_requested_reschedule_at, :datetime
  end
end
