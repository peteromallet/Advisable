# frozen_string_literal: true

class AddFeaturesToAccount < ActiveRecord::Migration[6.1]
  def change
    add_column :accounts, :features, :jsonb
  end
end
