class ChangeApplicationRateToDecimal < ActiveRecord::Migration[5.2]
  def change
    change_column :applications, :rate, :decimal
  end
end
