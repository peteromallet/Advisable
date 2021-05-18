# frozen_string_literal: true

class AddLogidzeToInterviews < ActiveRecord::Migration[6.1]
  def change
    add_column :interviews, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_interviews, on: :interviews
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_interviews on interviews;"
      end
    end
  end
end
