class AddPricingTypeToTasks < ActiveRecord::Migration[6.0]
  def up
    add_column :tasks, :pricing_type, :string
  end

  def down
    remove_column :tasks, :pricing_type, :string
  end
end
