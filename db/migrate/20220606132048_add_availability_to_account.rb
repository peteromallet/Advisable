# frozen_string_literal: true

class AddAvailabilityToAccount < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :availability, :text
  end
end
