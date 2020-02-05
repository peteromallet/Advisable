class AddAutoApplyToAppliations < ActiveRecord::Migration[6.0]
  def change
    add_column :applications, :auto_apply, :boolean
  end
end
