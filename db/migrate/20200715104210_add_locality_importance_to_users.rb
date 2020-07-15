class AddLocalityImportanceToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :locality_importance, :integer
  end
end
