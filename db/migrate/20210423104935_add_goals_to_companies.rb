# frozen_string_literal: true

class AddGoalsToCompanies < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      change_table(:companies, bulk: true) do |t|
        t.column(:goals, :jsonb)
        t.column(:feedback, :boolean)
        t.column(:business_type, :string)
        t.column(:marketing_attitude, :string)
      end
    end
  end
end
