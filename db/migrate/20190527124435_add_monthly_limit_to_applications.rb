class AddMonthlyLimitToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :monthly_limit, :int
  end
end
