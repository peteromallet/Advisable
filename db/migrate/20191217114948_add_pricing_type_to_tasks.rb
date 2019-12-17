class AddPricingTypeToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :pricing_type, :string
  end
end
