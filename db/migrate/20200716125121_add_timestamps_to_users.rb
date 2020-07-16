class AddTimestampsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :application_accepted_at, :datetime
    add_column :users, :application_rejected_at, :datetime
  end
end
