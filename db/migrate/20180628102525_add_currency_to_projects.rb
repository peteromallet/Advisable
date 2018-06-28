class AddCurrencyToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :currency, :string
  end
end
