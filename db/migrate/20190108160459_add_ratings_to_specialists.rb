class AddRatingsToSpecialists < ActiveRecord::Migration[5.2]
  def change
    add_column :specialists, :ratings, :jsonb, default: {}
  end
end
