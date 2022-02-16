# frozen_string_literal: true

class DropMarketingAttitudeFromCompanies < ActiveRecord::Migration[6.1]
  def change
    remove_column :companies, :marketing_attitude, :string
  end
end
