class AddHoursWorkedToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :hours_worked, :int
  end
end
