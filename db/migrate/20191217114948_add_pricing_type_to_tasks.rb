class AddPricingTypeToTasks < ActiveRecord::Migration[6.0]
  def up
    add_column :tasks, :pricing_type, :string

    Task.where(pricing_type: nil).find_each do |t|
      t.update(pricing_type: 'Hourly')
    end
  end

  def down
    remove_column :tasks, :pricing_type, :string
  end
end
