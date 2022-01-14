# frozen_string_literal: true

class AddTimezoneToAccount < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :timezone, :string
  end
end
