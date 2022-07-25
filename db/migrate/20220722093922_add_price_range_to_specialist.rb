# frozen_string_literal: true

class AddPriceRangeToSpecialist < ActiveRecord::Migration[7.0]
  def change
    add_column :specialists, :price_range, :string
  end
end
