class AddLogidzeToApplications < ActiveRecord::Migration[5.0]
  def change
    add_column :applications, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_applications, on: :applications
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_applications on applications;"
      end
    end
  end
end
