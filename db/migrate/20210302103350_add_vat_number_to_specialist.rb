# frozen_string_literal: true

class AddVatNumberToSpecialist < ActiveRecord::Migration[6.1]
  def change
    add_column :specialists, :vat_number, :string
  end
end
