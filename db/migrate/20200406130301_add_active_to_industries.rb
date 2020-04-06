class AddActiveToIndustries < ActiveRecord::Migration[6.0]
  def change
    add_column :industries, :active, :boolean
  end
end
