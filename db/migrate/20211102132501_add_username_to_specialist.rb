# frozen_string_literal: true

class AddUsernameToSpecialist < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_column :specialists, :username, :string
      add_index :specialists, :username, unique: true
    end
  end
end
