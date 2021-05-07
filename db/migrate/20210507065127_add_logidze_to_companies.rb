# frozen_string_literal: true

class AddLogidzeToCompanies < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_companies, on: :companies
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_companies on companies;"
      end
    end
  end
end
