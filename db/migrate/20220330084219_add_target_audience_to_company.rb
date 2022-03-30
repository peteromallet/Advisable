# frozen_string_literal: true

class AddTargetAudienceToCompany < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :target_audience, :string
  end
end
