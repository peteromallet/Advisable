class AddTrialToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :trial, :boolean
  end
end
