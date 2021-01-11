# frozen_string_literal: true

class CreateUnresponsivenessReports < ActiveRecord::Migration[6.1]
  def change
    create_table :unresponsiveness_reports, id: :uuid do |t|
      t.references :application, null: false, foreign_key: true
      t.references :reporter, null: false, foreign_key: {to_table: :accounts}

      t.text :message

      t.timestamps
    end
  end
end
