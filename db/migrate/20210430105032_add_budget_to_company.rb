# frozen_string_literal: true

class AddBudgetToCompany < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :budget, :bigint
  end
end
