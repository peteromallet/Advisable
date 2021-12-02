# frozen_string_literal: true

class DropMarketingAttitudeFromCompanies < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :companies, :marketing_attitude, :string
    end
  end
end
