class AddLogidzeToPreviousProjects < ActiveRecord::Migration[5.0]
  def change
    add_column :off_platform_projects, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_off_platform_projects, on: :off_platform_projects
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_off_platform_projects on off_platform_projects;"
      end
    end
  end
end
