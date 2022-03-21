# frozen_string_literal: true

class RemoveColumnsFromSpecialist < ActiveRecord::Migration[7.0]
  def change
    remove_column :specialists, :encrypted_phone_number, :string
    remove_column :specialists, :encrypted_phone_number_iv, :string
    remove_column :specialists, :phone, :string
  end
end
