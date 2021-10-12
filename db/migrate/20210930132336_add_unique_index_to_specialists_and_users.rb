# frozen_string_literal: true

class AddUniqueIndexToSpecialistsAndUsers < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_index :specialists, :account_id
      add_index :specialists, :account_id, unique: true
      remove_index :users, :account_id
      add_index :users, :account_id, unique: true
    end
  end
end
