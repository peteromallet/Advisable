# frozen_string_literal: true

class AddSourcingFeeToSpecialist < ActiveRecord::Migration[6.1]
  def change
    add_column :specialists, :sourcing_fee, :integer
  end
end
