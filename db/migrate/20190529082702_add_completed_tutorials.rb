class AddCompletedTutorials < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :completed_tutorials, :text, array: true, default: []
    add_column :specialists, :completed_tutorials, :text, array: true, default: []
  end
end
