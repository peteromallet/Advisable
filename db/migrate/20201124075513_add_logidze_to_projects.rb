class AddLogidzeToProjects < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_projects, on: :projects
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_projects on projects;"
      end
    end
  end
end
