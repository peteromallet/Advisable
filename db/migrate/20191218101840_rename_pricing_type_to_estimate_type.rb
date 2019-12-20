class RenamePricingTypeToEstimateType < ActiveRecord::Migration[6.0]
  def change
    rename_column :tasks, :pricing_type, :estimate_type
  end
end
