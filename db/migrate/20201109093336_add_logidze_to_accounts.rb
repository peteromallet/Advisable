class AddLogidzeToAccounts < ActiveRecord::Migration[5.0]
  def change
    add_column :accounts, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_accounts, on: :accounts
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_accounts on accounts;"
      end
    end
  end
end
