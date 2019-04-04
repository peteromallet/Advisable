class AddHiddenToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :hidden, :boolean
  end
end
