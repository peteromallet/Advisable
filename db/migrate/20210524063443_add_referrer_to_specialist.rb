# frozen_string_literal: true

class AddReferrerToSpecialist < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :specialists, :referrer, foreign_key: {to_table: :specialists}
    end
  end
end
