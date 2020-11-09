class AddLogidzeToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_users, on: :users
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_users on users;"
      end
    end
  end
end
