# frozen_string_literal: true

class AddIbanToSpecialist < ActiveRecord::Migration[6.1]
  def change
    add_column :specialists, :iban, :string
  end
end
