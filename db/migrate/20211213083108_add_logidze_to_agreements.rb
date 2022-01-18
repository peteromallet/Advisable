# frozen_string_literal: true

class AddLogidzeToAgreements < ActiveRecord::Migration[6.1]
  def change
    add_column :agreements, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_agreements, on: :agreements
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_agreements on agreements;"
      end
    end
  end
end
