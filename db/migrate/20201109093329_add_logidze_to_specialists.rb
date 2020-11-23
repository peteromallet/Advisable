class AddLogidzeToSpecialists < ActiveRecord::Migration[5.0]
  def change
    add_column :specialists, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_specialists, on: :specialists
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_specialists on specialists;"
      end
    end
  end
end
