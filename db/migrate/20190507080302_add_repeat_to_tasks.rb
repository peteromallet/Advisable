class AddRepeatToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :repeat, :string
  end
end
