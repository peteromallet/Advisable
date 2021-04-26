# frozen_string_literal: true

class AddMarketingAttitudeToCompanies < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :marketing_attitude, :string
  end
end
