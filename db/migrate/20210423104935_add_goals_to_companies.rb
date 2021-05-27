# frozen_string_literal: true

class AddGoalsToCompanies < ActiveRecord::Migration[6.1]
  def change
    add_column(:companies, :goals, :text, array: true, default: [])
  end
end
