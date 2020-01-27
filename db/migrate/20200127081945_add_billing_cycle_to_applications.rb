class AddBillingCycleToApplications < ActiveRecord::Migration[6.0]
  def change
    add_column :applications, :billing_cycle, :string
  end
end
