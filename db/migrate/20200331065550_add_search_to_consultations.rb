class AddSearchToConsultations < ActiveRecord::Migration[6.0]
  def change
    add_reference :consultations, :search, index: true
  end
end
