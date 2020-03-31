class AddRejectionReasonToConsultations < ActiveRecord::Migration[6.0]
  def change
    add_column :consultations, :rejection_reason, :string
  end
end
