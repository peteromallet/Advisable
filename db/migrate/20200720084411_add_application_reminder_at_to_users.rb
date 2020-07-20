class AddApplicationReminderAtToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :application_reminder_at, :datetime
  end
end
