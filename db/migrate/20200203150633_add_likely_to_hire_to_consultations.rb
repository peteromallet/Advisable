class AddLikelyToHireToConsultations < ActiveRecord::Migration[6.0]
  def change
    add_column :consultations, :likely_to_hire, :integer
  end
end
