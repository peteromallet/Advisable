# frozen_string_literal: true

class CreateProblematicFlags < ActiveRecord::Migration[6.1]
  def change
    create_table :problematic_flags, id: :uuid do |t|
      t.references :application, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.text :message

      t.timestamps
    end
  end
end
