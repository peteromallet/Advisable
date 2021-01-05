class AddLogidzeToTasks < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_tasks, on: :tasks
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_tasks on tasks;"
      end
    end
  end
end
