# frozen_string_literal: true

class AddUnavailableUntilToSpecialist < ActiveRecord::Migration[6.1]
  def change
    add_column :specialists, :unavailable_until, :date
  end
end
