class AddColorToIndustries < ActiveRecord::Migration[6.0]
  def change
    add_column :industries, :color, :string
  end
end
