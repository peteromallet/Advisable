class AddUtmsToConsultations < ActiveRecord::Migration[6.0]
  def change
    add_column :consultations, :source, :string
  end
end
