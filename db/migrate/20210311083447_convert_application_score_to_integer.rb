# frozen_string_literal: true

class ConvertApplicationScoreToInteger < ActiveRecord::Migration[6.1]
  def up
    safety_assured do
      execute "ALTER TABLE applications ALTER COLUMN score TYPE INTEGER;"
    end
  end

  def down
    safety_assured do
      execute "ALTER TABLE applications ALTER COLUMN score TYPE DECIMAL;"
    end
  end
end
