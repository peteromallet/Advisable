# frozen_string_literal: true

class RemoveBudgetFromUsers < ActiveRecord::Migration[6.1]
  def change
    safety_assured { remove_column :users, :budget, :bigint }
  end
end
