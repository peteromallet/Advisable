class AddAppliedAtToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :applied_at, :datetime
  end
end
