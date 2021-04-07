# frozen_string_literal: true

class RemoveGuildDataFromSpecialist < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :specialists, :guild_data, :jsonb
    end
  end
end
